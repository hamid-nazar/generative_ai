import json
import uuid
import time
from PyPDF2 import PdfReader
import openai
from decouple import config
import pinecone

openai.api_key = config("OPENAI_API_KEY")

pinecone.init(api_key=config("PINECONE_API_KEY"), environment=config("PINECONE_ENV"))

index_name = "semanticsearch"

if index_name not in pinecone.list_indexes():
    pinecone.create_index(name=index_name, metric="cosine", dimension=1536)

time.sleep(1)



pinecone_index = pinecone.Index("semanticsearch")



def generate_text(messages):

     instruction = """You are a virtual companion who is empathetic, patient, and knowledgeable. Answer as pricesily as possible to the following prompt: """

     prompt = ""
     
     for message in messages:
        prompt += f"{message['role']}: {message['content']}\n"

     print(prompt)

     response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"{instruction} \n {prompt} \n Dont include the word 'Assistant: ' in your response.",
        max_tokens=100,
        n=1,
        temperature=0,
    )
     
     
     return response.choices[0].text


def generate_image(prompt="An astronaut riding a horse",n=1, size="256x256"):
    response = openai.Image.create(
        prompt=prompt,
        n=n,
        size=size,
    )

    images = []
    for image in response["data"]:

        image_url = image["url"]

        images.append({"url": image_url})

    return images


# generated_image = generate_image("An astronaut riding a horse",2,"256x256")

# print(generated_image)

def create_paragraph_chunks(text):

    paragraphs = text.split('\n\n') 

    text_chunks = []

    for paragraph in paragraphs:
        
        lower_case = paragraph.lower()
        print(lower_case)
        text_chunks.append(lower_case)

    return text_chunks

def embed(chunk):

    text = chunk.replace("\n", " ")

    response = openai.Embedding.create(
            input=[text],
            model="text-embedding-ada-002"
        )
    return response["data"][0]["embedding"]



def save_to_pinecone( embeddings):

    for embedding in embeddings:  

        pinecone_index.upsert(embedding)


def create_embedding(pdf_file):

    reader = PdfReader(pdf_file)
    pages = reader.pages

    text = ""
    text_chunks = []
 
    for page in pages:
    
         text = page.extract_text()
         
         text_chunks.append(text)

    # text_chunks = create_paragraph_chunks(text)

    print(text)

    embeddings = []
        
    for chunk in text_chunks:
       id = uuid.uuid4().hex
       embedding = embed(chunk)
       print(embedding)
       embeddings.append([(id, embedding, {"text": chunk})])

    save_to_pinecone(embeddings)


# pdf_file_path = './facts.pdf'

# create_embedding(pdf_file_path)


def prompt_generator(query, contexts):

    limit = 400

    prompt_start = (
        "Answer the question based on the context below.\n\n"+
        "Context:\n"
    )

    
    prompt_end = (
        f"\n\nQuestion: {query}\nAnswer:"
    )
    # append contexts until hitting limit
    for i in range(1, len(contexts)):
        if len("\n\n---\n\n".join(contexts[:i])) >= limit:
            prompt = (
                prompt_start +
                "\n\n---\n\n".join(contexts[:i-1]) +
                prompt_end
            )
            break
        elif i == len(contexts)-1:
            prompt = (
                prompt_start +
                "\n\n---\n\n".join(contexts) +
                prompt_end
            )
    return prompt


def OpenAI_concrete_response_about_pdf(prompt):

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=100,
        n=1,
        temperature=0, )

    return response.choices[0].text

    
def query_pincone(query_text):

    query_embedding = embed(query_text)

    results = pinecone_index.query([query_embedding], top_k=2,include_metadata=True)

    return results







# query_text = "What is the capital of australia "

# results = query(query_text)


# for match in results["matches"]:
#     print(f"Text chunk: {match['metadata']['text']}")
#     print(f"Similarity score: {match['score']}")
#     print("\n")




# def save_to_pinecone(chunk, embedding):
    
#     pinecone_index.upsert(vectors=[{
#         "id": gen_uuid(),
#         "values": embedding,
#         "metadata": {
#             "text": chunk
#         }
#     }])


