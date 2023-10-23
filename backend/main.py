from flask import Flask
from flask_restx import Api, Resource
from config import DevelopmentConfig
from models import User
from  exts import db


app = Flask(__name__) 
app.config.from_object(DevelopmentConfig)
db.init_app(app)
api = Api(app, doc="/docs")


@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'messeage': 'hello world'}
    

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User}

if __name__ == '__main__':
    app.run(debug=True)