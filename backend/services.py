import openai
from decouple import config


openai.api_key = config("OPENAI_API_KEY")


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
