from decouple import config

class Config:
    SECRET_KEY = config('SECRET_KEY')


class DevelopmentConfig(Config):
    SQLALCHEMY_TRACK_MODIFICATIONS = False 
    SQLALCHEMY_DATABASE_URI = config('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_ECHO = True
    UPLOAD_FOLDER = 'uploads'
    DEBUG = True



class ProductionConfig(Config):
    DEBUG = False