CREATE TABLE private.votes (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	person_id uuid REFERENCES private.people(id) ON DELETE CASCADE NOT NULL,
	prompt_id INT REFERENCES private.prompts(id) ON DELETE CASCADE NOT NULL,
	word_id INT REFERENCES private.words(id) ON DELETE CASCADE NOT NULL,
	UNIQUE (person_id, prompt_id),
	CONSTRAINT word_matches_prompt
		FOREIGN KEY (prompt_id, word_id)
		REFERENCES private.words(prompt_id, id)
);
