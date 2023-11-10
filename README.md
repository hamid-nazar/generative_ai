# Savant

Savant is a web application that integrates the OpenAI API to do text generation, image generation, and similarity/semantic search on documents. The objective of the application is to create a web platform which incorporates several distinct generative AI models. This platform gives potential users the ability to generate content(text/images) and to do some simple document analysis. The motivation behind selecting this project was to explore the capabilities of OpenAI models and create a user-friendly interface for utilizing these models in real-world applications.

For similarity/semantic search on documents, we have used Pinecone, which is a fully managed vector database platform designed to handle high-dimensional vector data at scale.The OpenAI Embedding API is used to generate embeddings for the text data. 

## Table of Contents

- [Backend](#backend)

- [Frontend](#frontend)
- [Vido Demo](#video-demo)

# Backend 

## Setup Instructions


#### Prerequisites & Dependencies

- Python 3.x
- Flask
- SQLAlchemy
- MySQL database
- OpenAI API (You will need an API key from OpenAI)
- Pinecone API (You will need an API key from OpenAI)
- Conda or pip (for managing virtual environment)

List any prerequisites or dependencies that users need to have installed before they can use your project. Mention if you've included a Conda environment or requirements file.
###  Clone the Repository
- Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git

- '''cd generative-AI/backend'''

### Create a Virtual Environment 
- conda create --name myenv python=3.x
- conda activate myenv
- pip install -r requirements.txt



### Set Up Your .env file
- SQLALCHEMY_DATABASE_URI=mysql://your_username:your_password@localhost/your_database_name
- OPENAI_API_KEY = your_openai_api_key
- PINECONE_API_KEY = your_pinecone_api_key

### Run The Application
- python3 main.y

### Backend Structure
- ```main.py```: Defines alle the API endpoints that interact with the frontend of the application
- ```services.py``` : Defines all the functions that interacts with external APIs 
- ```models.py```: Defines the different models in the application
- ```config.py```: Defines the various configurations 
- ```requirements.txt``` : Lists all project-specific dependencies.


# Frontend 
## Install Dependencies an Run The Application
- cd generative-AI/front 
- npm install
- npm run dev


## Tech Stack 
- React + Vite 
- Tailwind CSS 
- Axios 


# Video Demo

[![""](./frontend/public/thamnail.png)](https://drive.google.com/file/d/19qgk7fxjWH_epWxWnZuSadGOnlNUJFcW/view?usp=sharing)



## Additional Notes
- You need to download the report on your own machine if you want to access the links mentioned in the reference section of the report 