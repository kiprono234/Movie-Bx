from flask import Flask, request,jsonify
from flask_restful import Resource,Api
import requests
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db,User,Watchlist
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
import os



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

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

class SignupResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

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
            return ({"access_token": access_token, "user": user.to_dict()}), 200
        else:
            return ({"error": "Invalid email or password"}), 401

class MovieListResource(Resource):
    def get(self):
        page = request.args.get("page", 1, type=int)
        genre_name = request.args.get("genre", "All")

        genre_response = requests.get(
            f"{BASE_URL}/genre/movie/list?api_key={TMDB_API_KEY}&language=en-US"
        )
        if genre_response.status_code != 200:
            return {"error": "Failed to fetch genres"}, 500

        genres = genre_response.json().get("genres", [])
        genre_id = None
        if genre_name and genre_name.lower() != "all":
            for g in genres:
                if g["name"].lower() == genre_name.lower():
                    genre_id = g["id"]
                    break

        if genre_id:
            url = f"{BASE_URL}/discover/movie?api_key={TMDB_API_KEY}&with_genres={genre_id}&language=en-US&page={page}"
        else:
            url = f"{BASE_URL}/movie/popular?api_key={TMDB_API_KEY}&language=en-US&page={page}"

        response = requests.get(url)
        if response.status_code != 200:
            return {"error": "Failed to fetch movies"}, 500

        data = response.json()
        movies = [
            {
                "id": m["id"],
                "title": m["title"],
                "overview": m["overview"],
                "poster": f"https://image.tmdb.org/t/p/w500{m['poster_path']}" if m.get("poster_path") else None,
                "release_date": m.get("release_date"),
                "vote_average": m.get("vote_average"),
                "genre_ids": m.get("genre_ids", []),
            }
            for m in data.get("results", [])
        ]

        return {
            "page": data.get("page", 1),
            "total_pages": min(data.get("total_pages", 1), 50),  # limit
            "results": movies,
        }, 200


class MovieResource(Resource):
    def get(self, movie_id):
        """Fetch a specific movie by ID from TMDB"""
        response = requests.get(
            f"{BASE_URL}/movie/{movie_id}?api_key={TMDB_API_KEY}"
        )

        if response.status_code != 200:
            return {"error": "Movie not found"}, 404

        m = response.json()
        movie = {
            "id": m["id"],
            "title": m["title"],
            "overview": m["overview"],
            "poster": f"https://image.tmdb.org/t/p/w500{m['poster_path']}"
            if m.get("poster_path")
            else None,
            "release_date": m.get("release_date"),
            "vote_average": m.get("vote_average"),
            "genres": [g["name"] for g in m.get("genres", [])],
        }

        return movie, 200

class GenreListResource(Resource):
    def get(self):
        response = requests.get(
            f"https://api.themoviedb.org/3/genre/movie/list?api_key={TMDB_API_KEY}&language=en-US"
        )
        if response.status_code == 200:
            data = response.json()
            return data.get("genres", []), 200
        return {"error": "Failed to fetch genres"}, 500

class WatchListResource(Resource):
    @jwt_required()
    def get(self):
        """Fetch the logged-in user's watchlist"""
        try:
            user_id = get_jwt_identity()
            items = Watchlist.query.filter_by(user_id=user_id).all()
            return jsonify([item.to_dict() for item in items])
        except Exception as e:
            print("❌ Error fetching watchlist:", e)
            return {"message": "Internal Server Error"}, 500

    @jwt_required()
    def post(self):
        """Add a new movie to the user's watchlist"""
        data = request.get_json()
        user_id = get_jwt_identity()

        try:
            # prevent duplicates
            existing = Watchlist.query.filter_by(user_id=user_id, movie_id=data.get("id")).first()
            if existing:
                return {"message": "Already in watchlist"}, 400

            new_item = Watchlist(
                movie_id=data.get("id"),
                title=data.get("title"),
                poster=data.get("poster"),
                overview=data.get("overview"),
                release_date=data.get("release_date"),
                user_id=user_id  # ✅ set user ID here
            )
            db.session.add(new_item)
            db.session.commit()
            return new_item.to_dict(), 201
        except Exception as e:
            print("❌ Error adding movie to watchlist:", e)
            db.session.rollback()
            return {"message": "Internal Server Error"}, 500

    @jwt_required()
    def delete(self, movie_id):
        """Delete a movie from the user's watchlist"""
        try:
            user_id = get_jwt_identity()
            movie = Watchlist.query.filter_by(user_id=user_id, movie_id=movie_id).first()
            if movie:
                db.session.delete(movie)
                db.session.commit()
                return {"message": "Deleted successfully"}, 200
            return {"message": "Movie not found"}, 404
        except Exception as e:
            print("❌ Error deleting movie from watchlist:", e)
            db.session.rollback()
            return {"message": "Internal Server Error"}, 500


class MovieDetailResource(Resource):
    def get(self, movie_id):
        url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US"
        response = requests.get(url)

        if response.status_code != 200:
            return {"error": "Failed to fetch movie details"}, 500

        m = response.json()
        movie = {
            "id": m["id"],
            "title": m["title"],
            "overview": m["overview"],
            "poster": f"https://image.tmdb.org/t/p/w500{m['poster_path']}" if m.get("poster_path") else None,
            "release_date": m["release_date"],
            "vote_average": m["vote_average"],
            "genres": [g["name"] for g in m.get("genres", [])],
        }
        return movie, 200


api.add_resource(SignupResource,"/signup")
api.add_resource(LoginResource, "/login")
api.add_resource(MovieListResource, "/api/movies")
api.add_resource(MovieResource, "/movies/<int:movie_id>")
api.add_resource(WatchListResource,"/watchlist","/watchlist/<int:movie_id>")
api.add_resource(GenreListResource, "/api/genres")
api.add_resource(MovieDetailResource, "/api/movies/<int:movie_id>")


if __name__ == "__main__":

    app.run(debug=True)
