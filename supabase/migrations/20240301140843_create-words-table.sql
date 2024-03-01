CREATE TABLE private.words (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	prompt_id INT REFERENCES private.prompts(id) ON DELETE CASCADE NOT NULL,
	text VARCHAR(255) NOT NULL,
	tally INT DEFAULT 0,
	UNIQUE (prompt_id, text),
	UNIQUE (id, prompt_id)
);

CREATE OR REPLACE FUNCTION add_word()
RETURNS TRIGGER AS $$
BEGIN
	INSERT INTO private.words
		(prompt_id, text)
	VALUES
		(new.prompt_id, new.word)
	ON CONFLICT (prompt_id, text) DO NOTHING;

	RETURN new;
END $$ LANGUAGE PLPGSQL;

CREATE TRIGGER add_submission_to_words
	AFTER INSERT OR UPDATE
	ON private.submissions
	FOR EACH ROW
	EXECUTE FUNCTION add_word();
