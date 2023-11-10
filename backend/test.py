import pinecone
import time
from decouple import config

pinecone.init(api_key=config("PINECONE_API_KEY"), environment=config("PINECONE_ENV"))

index_name = "semanticsearch"

if index_name not in pinecone.list_indexes():
    pinecone.create_index(name=index_name, metric="cosine", dimension=1536)

time.sleep(1)

# Create an Index object
pinecone_index = pinecone.Index(index_name)

def delete_pinecone():
    global pinecone_index

    pinecone_index.delete("semanticsearch")

# Delete the Pinecone index
delete_pinecone()