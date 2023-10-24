import openai
from decouple import config


openai.api_key = config("OPENAI_API_KEY")


def generate_text(prompt):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=50,
        n=1,
        temperature=0.5,
    )
    return response.choices[0].text


def language_translator(to_lang, text):

    result = f"translate to {to_lang} the following: {text}"

    response = openai.Completion.create(
        engine="davinci",
        prompt=result,
        max_tokens=50,
        n=1,
        temperature=0.5,
    )
    return response.choices[0].text
