# Savant

Savant is a web application that integrates the OpenAI API to do text generation, image generation, and similarity/semantic search on documents. The objective of the application is to leverage generative AI models to provide users with powerful tools for content generation and document analysis. The motivation behind selecting this project was to explore the capabilities of OpenAI models and create a user-friendly interface for utilizing these models in real-world applications.

For similarity/semantic search on documents, we have used Pinecone, which is a fully managed vector database platform designed to handle high-dimensional vector data at scale.The OpenAI Embedding API is used to generate embeddings for the text data. 

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Provide instructions on how to set up and run your Flask project.

### Prerequisites

List any prerequisites or dependencies that users need to have installed before they can use your project. Mention if you've included a Conda environment or requirements file.

### Installation

1. Clone the repository:  ```bash git clone https://github.com/yourusername/your-repo.git
2. Go to the ```backend``` directory and run: ```bash pip install -r requirements.txt
3. Run: ```bash Python3 main.py