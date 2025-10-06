from flask import Flask, request,jsonify
from flask_restful import Resource,Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db,User,Movie
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

load_dotenv()

app=Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

api=Api(app)
db.init_app(app)
migrate=Migrate(app,db)
CORS(app,supports_credentials=True)
jwt = JWTManager(app)


class SignupResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        # check if user already exists
        if User.query.filter_by(email=email).first():
            return {"error": "Email already registered"}, 400

        new_user = User(username=username, email=email)
        new_user.set_password(password)

        db.session.add(new_user)
        db.session.commit()

        return {"message": "User created successfully", "user": new_user.to_dict()}, 201

class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = User.query.filter_by(email=email).first()
        if user and user.check_password (password):
            access_token = create_access_token(identity=user.id)
            return ({"token": access_token, "user": user.to_dict()}), 200
        else:
            return ({"error": "Invalid email or password"}), 401

class MovieListResource(Resource):
    @jwt_required
    def get(self):
        movies = Movie.query.all()
        return [m.to_dict() for m in movies], 200

    @jwt_required
    def post(self):
        current_user_id=get_jwt_identity()
        data = request.get_json()
        new_movie = Movie(title=data["title"], genre=data["genre"], year=data["year"])
        db.session.add(new_movie)
        db.session.commit()
        return new_movie.to_dict(), 201


class MovieResource(Resource):
    @jwt_required
    def get(self, movie_id):
        movie = Movie.query.get_or_404(movie_id)
        return movie.to_dict(), 200

    @jwt_required
    def delete(self, movie_id):
        movie = Movie.query.get_or_404(movie_id)
        db.session.delete(movie)
        db.session.commit()
        return {"message": "Movie deleted"}, 200

api.add_resource(SignupResource,"/signup")
api.add_resource(MovieListResource, "/movies")
api.add_resource(MovieResource, "/movies/<int:movie_id>")
api.add_resource(LoginResource, "/login")


if __name__ == "__main__":

    app.run(debug=True)
