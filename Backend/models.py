from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


db=SQLAlchemy()


class User(db.Model) :
    __tablename__="users"
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(80), unique=True, nullable=False)
    email=db.Column(db.String(120), unique=True, nullable= False)
    password_hash=db.Column(db.String(200),nullable=False)

    watchlist = db.relationship("Watchlist", backref="user",cascade="all, delete-orphan", lazy=True)

    def set_password(self,password):
        """Hash and store the password securely"""
        self.password_hash=generate_password_hash(password)

    def check_password(self,password):
        """Check the password hash"""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return{"id": self.id, "username": self.username, "email": self.email}

class Watchlist(db.Model):
    __tablename__ = 'watchlist'

    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, unique=True)
    title = db.Column(db.String, nullable=False)
    poster = db.Column(db.String)
    overview = db.Column(db.String)
    release_date = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "movie_id": self.movie_id,
            "title": self.title,
            "poster": self.poster,
            "overview": self.overview,
            "release_date": self.release_date
        }