import os
import sys
from dotenv import load_dotenv
import google.generativeai as ai

load_dotenv()

def main():
	if len(sys.argv) < 3:
		print("Usage: python create_definitions.py <topic> <iterations>", file=sys.stderr)
		sys.exit(1)

	topic = sys.argv[1]
	iterations = int(sys.argv[2])

	api_key = os.getenv("GEMINI_API_KEY")
	ai.configure(api_key = api_key)
	model = ai.GenerativeModel("gemini-pro")

	for _ in range(iterations):
		create_definition(topic, model)

def create_definition(topic: str, model: ai.GenerativeModel):
	print("\n==============================================\n")

	# Give it a goal, an instruction, and a format.
	# I had to avoid feelings and sensations because the AI for some reason only ever generates
	# those unless you tell it not to, and the sensation it generates is generally for something
	# that has an English word already.
	definition = model.generate_content("""
		Your goal is to find definitions for words that do not exist in English.
		Now, come up with a concept or phrase related to {topic} that does not have an English word associated with it.
		Avoid feelings or sensations.
		Respond only with the definition, not the word.
	""".format(topic=topic))

	print("Definition: " + definition.text)

	# The second bot challenges the first by trying to find words that _do_ match the definition.
	# It actually does help find good results. Good results will either have low scores, or the
	# words it uses are actually two- or three-word phrases.
	words = model.generate_content("""
		What are some english words that mean '{definition}'?
		Give the word and a score out of 10 of how closely it matches the definition.
		Format your response as 'word: score'.
	""".format(definition=definition.text))

	print(words.text)

main()
