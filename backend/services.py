import openai
from decouple import config


openai.api_key = config("OPENAI_API_KEY")


def generate_text(prompt):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=50,
        n=1,
        temperature=0,
    )
    return response.choices[0].text


def generate_image(prompt="An astronaut riding a horse",n=2, size="256x256"):
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
