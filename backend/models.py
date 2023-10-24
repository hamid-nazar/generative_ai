
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    hashed_password = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return f"<User {self.first_name}>"

    # def save_to_db(self):
    #     db.session.add(self)
    #     db.session.commit()


    # def delete_from_db(self):
    #     db.session.delete(self)
    #     db.session.commit()

    # def update(self, first_name, last_name):
    #     self.first_name = first_name
    #     self.last_name = last_name
       


