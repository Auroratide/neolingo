CREATE TABLE private.dictionary (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	prompt_id INT REFERENCES private.prompts(id) NOT NULL,
	word VARCHAR(255) NOT NULL
);