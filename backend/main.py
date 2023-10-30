from io import BytesIO
import io
import os
from flask import Flask, Response, jsonify, request, send_file
from config import DevelopmentConfig
from models import UploadedFile, db, User

from flask_cors import CORS

from utils import hash_password
from services import generate_text


app = Flask(__name__) 
app.config.from_object(DevelopmentConfig)
db.init_app(app)

CORS(app)


# Enable CORS for all routes
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    return response


@app.route('/register', methods=['POST'])
def signup():
    try:
        data = request.get_json()

        # Validate input data
        required_fields = ['firstName', 'LastName', 'email', 'password']
        for field in required_fields:
            if field not in data:
                return jsonify(error='Missing required field: {}'.format(field)), 400

        first_name = data['firstName']
        last_name = data['LastName']
        email = data['email']
        password = data['password']

        # Hash the password securely 
        hashed_password = hash_password(password)

        # Create a new user instance
        new_user = User(first_name=first_name, last_name=last_name, email=email, hashed_password=hashed_password)

        # Add the user to the database
        db.session.add(new_user)
        db.session.commit()

        return jsonify(message='Registered successfully'), 200

    except Exception as e:
        # Handle exceptions (e.g., database errors) and return an error response
        return jsonify(error='Registration failed: {}'.format(str(e))), 500

@app.route('/')
def home():
    
    return jsonify(message='Welcome to Savant!')


@app.route('/conversation', methods=['POST'])
def conversation():
    data = request.get_json()
    prompt = data.get('prompt')
    
    response = generate_text(prompt)
    return jsonify(response=response)


@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        uploaded_file = request.files['file']
     
        print(request.files)
        new_file = UploadedFile(filename=uploaded_file .filename, data=uploaded_file .read())
        db.session.add(new_file)
        db.session.commit()

        return jsonify({'message': 'File uploaded and saved to the database successfully'})
    except Exception as e:
        db.session.rollback()  # Rollback the transaction in case of an error
        return jsonify({'error': str(e)}), 500
        


@app.route('/file', methods=['GET'])
def get_file():
    

    upload = UploadedFile.query.first()
  
    if not upload:
        return jsonify({'message': 'No file found'}), 404

    return send_file(BytesIO(upload.data),download_name=upload.filename, as_attachment=True)
  
    





with app.app_context():
    # Drop database tables
    # db.drop_all()
    # Create database tables
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)



# def create_app():
#     app = Flask(__name)
#     app.config.from_object('config')  # Load your app's configuration
    
#     db.init_app(app)  # Initialize the SQLAlchemy instance
#     db.create_all()   # Create the database tables

#     return app