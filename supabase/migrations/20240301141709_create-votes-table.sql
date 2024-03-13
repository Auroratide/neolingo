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

CREATE OR REPLACE FUNCTION require_word_first()
RETURNS TRIGGER AS $$
BEGIN
	IF NOT EXISTS (SELECT 1 FROM private.submissions WHERE person_id = new.person_id AND prompt_id = new.prompt_id) THEN
		RAISE EXCEPTION 'You must submit a word before you can vote. SOLUTION: Refresh the page and try again.';
	END IF;

	RETURN new;
END $$ LANGUAGE PLPGSQL;

CREATE TRIGGER require_word_first
	BEFORE INSERT OR UPDATE
	ON private.votes
	FOR EACH ROW
	EXECUTE FUNCTION require_word_first();
