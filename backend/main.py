from io import BytesIO
from PyPDF2 import PdfReader
from flask import Flask, Response, jsonify, request, send_file
from config import DevelopmentConfig
from models import UploadedFile, db, User

from flask_cors import CORS

from utils import hash_password
from services import create_embedding, generate_image, generate_text, prompt_generator, query_pincone, OpenAI_concrete_response_about_pdf


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

    print('Received data:', data)
    
    messages = data['prompt']

    print("Received prompt: ", messages)

    response = generate_text(messages)

    print("Generated response: " + response)

    return jsonify({"content": response, "role":"assistant"})

    # return jsonify({'message': 'message received'})


@app.route('/image', methods=['POST'])
def image_generator():

    try:
        prompt = request.json['prompt']

        n = int(request.json['amount'])
        

        size = request.json['resolution']
        
        print("Received prompt: " + prompt, n,size)
      
        images = []

        images = generate_image(prompt=prompt, n=n, size=size)


        return jsonify(images)
    
    except Exception as e:
        db.session.rollback()  # Rollback the transaction in case of an error
        return jsonify({'error': str(e)}), 500



@app.route('/upload', methods=['POST'])
def upload_file():
    try:
    # delete all files from the database before uploading a new one
        # db.session.query(UploadedFile).delete()
        
        UploadedFile.query.delete()

        file = request.files['file']
     
        print(request.files)
        new_file = UploadedFile(filename=file.filename, data=file.read())
        db.session.add(new_file)
        db.session.commit()

        return jsonify({'message': 'File uploaded and saved to the database successfully'})
    except Exception as e:
        db.session.rollback()  # Rollback the transaction in case of an error
        return jsonify({'error': str(e)}), 500
        


@app.route('/file/<name>', methods=['GET'])
def get_file(name):
    
    file_name = name + ".pdf"

    print(file_name)

    upload = UploadedFile.query.filter_by(filename=file_name).first()
  
    if not upload:
        return jsonify({'message': 'No file found'}), 404
    
    pdf_file = BytesIO(upload.data)

    # create embedding of the uploaded file and then save it to the vector database
    create_embedding(pdf_file)

    return send_file(BytesIO(upload.data),download_name=upload.filename, as_attachment=True)
  
    

@app.route('/search/<name>', methods=['POST'])
def similarity_search(name):
    
    try:
        query = request.json["query"]
        
        print("Received query: " + query)

        # query Pinecone vector store
        query_results = query_pincone(query)

        print(query_results['matches'][0]['metadata']['text'].replace("\n", ""))

      
        result = query_results['matches'][0]['metadata']['text'].replace("\n", "")
        
        # for match in query_results["matches"]:
        #     print()
        #     print(f"Text chunk: {match['metadata']['text']}")

        contexts = [x['metadata']['text'] for x in query_results['matches']]

        prompt = prompt_generator(query, contexts)

        # If uncomment the lines below and comment the line "return jsonify({'message': result}),200" ,
        # then it will generate a more detailed and concrete response from OpenAI

        # answer = OpenAI_concrete_response_about_pdf(prompt)

        # print("Generated response by OpenAI : " + answer)

        # return jsonify({'message': answer})
        
        return jsonify({'message': result}),200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
 


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