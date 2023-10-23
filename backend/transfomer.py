# from transformers import GPT2LMHeadModel, GPT2Tokenizer

# # Load pre-trained model and tokenizer
# model_name = 'gpt2'  # You can use other models like 'gpt2-medium', 'gpt2-large', etc.
# tokenizer = GPT2Tokenizer.from_pretrained(model_name)
# model = GPT2LMHeadModel.from_pretrained(model_name)

# # Input text
# input_text = "What is the capital city of Norway?"

# # Tokenize input text and generate output
# input_ids = tokenizer.encode(input_text, return_tensors='pt')
# output = model.generate(input_ids, max_length=150, num_return_sequences=1)

# # Decode and print generated text
# generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
# print("Generated Text:")
# print(generated_text)

from transformers import pipeline

# Load the Question Answering pipeline using a pre-trained model
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad", tokenizer="distilbert-base-cased")

# Function to answer questions
def answer_question(question):
    context = "The quick brown fox jumps over the lazy dog. "  # Dummy context for the lack of specific context
    answer = qa_pipeline(question=question, context=context)
    return answer["answer"]

# Example usage
question = "What did the fox jump over?"
answer = answer_question(question)
print("Answer:", answer)



