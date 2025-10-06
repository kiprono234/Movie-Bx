from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


db=SQLAlchemy()


class User(db.Model) :
    __tablename__="Users"
    id=db.Column(db.Integer,primary_key=True)
    username=db.Column(db.String(80), unique=True, nullable=False)
    email=db.Column(db.String(120), unique=True, nullable= False)
    password_hash=db.Column(db.String(200),nullable=False)

    def set_password(self,password):
        """Hash and store the password securely"""
        self.password_hash=generate_password_hash(password)

    def check_password(self,password):
        """Check the password hash"""
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return{"id": self.id, "username": self.username, "email": self.email}


class Movie(db.Model):
    __tablename__="Movies"

    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String(120), nullable=False)
    genre= db.Column(db.String(80),nullable=False)
    year=db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return{"id": self.id, "title": self.title, "genre": self.genre,"year":self.year}
