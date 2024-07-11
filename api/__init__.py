from flask import Flask 
from flask_sqlalchemy import SQLAlchemy
from flask_praetorian import Praetorian
from flask_cors import CORS
from os import path
from datetime import datetime

DB_NAME = "database.db"
db = SQLAlchemy()
guard = Praetorian()
cors = CORS()

# Class-based application configuration
class ConfigClass(object):
    """ Flask application config """

    # Flask settings
    SECRET_KEY = 'rfnjkirfoehfifreohhrfbf rfjrnfjrfrfnrjfrjuef'
    SQLALCHEMY_TRACK_MODIFICATIONS= False
    SQLALCHEMY_DATABASE_URI = f'sqlite:///{DB_NAME}'
    JWT_ACCESS_LIFESPAN = {'hours': 24}
    JWT_REFRESH_LIFESPAN = {'days': 30}

# parent class
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), unique=True)
    password = db.Column(db.String(200), nullable=False)
    roles = db.Column(db.String(100))
    is_active = db.Column(db.Boolean, default=True, server_default="true")
    hackathon = db.relationship("Hackathon", backref="user", lazy=True)

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []

    @classmethod
    def lookup(cls, email):
        return cls.query.filter_by(email=email).one_or_none()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.is_active

class Hackathon(db.Model):
    __tablename__ = 'hackathon'
    id = db.Column(db.Integer, primary_key=True)
    created_on = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    name = db.Column(db.String(200), nullable=False)
    desc = db.Column(db.String(1000), nullable=False)
    manager = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def __repr__(self):
        return '<Hackathon %r>' % self.name 


def create_app():
    app = Flask(__name__)

    app.config.from_object(__name__+'.ConfigClass')

    guard.init_app(app, User)
    db.init_app(app)
    cors.init_app(app)

    from .views import views

    app.register_blueprint(views, url_prefix="/")

    create_database(app)

    return app

def create_database(app):
    if not path.exists(DB_NAME): 
        db.create_all(app=app)
        print("database created")
