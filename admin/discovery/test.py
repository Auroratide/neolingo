import os
from dotenv import load_dotenv
import google.generativeai as ai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
ai.configure(api_key = api_key)

model = ai.GenerativeModel("gemini-pro")

response = model.generate_content("Complete this sentence the way a programmer would: 'Hello '")

print(response.text)
