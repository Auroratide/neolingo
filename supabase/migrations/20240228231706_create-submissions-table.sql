CREATE TABLE private.submissions (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	person_id uuid REFERENCES private.people(id) ON DELETE CASCADE NOT NULL,
	prompt_id INT REFERENCES private.prompts(id) ON DELETE CASCADE NOT NULL,
	word VARCHAR(255) NOT NULL,
	UNIQUE (person_id, prompt_id),
	CONSTRAINT only_lowercase_letters CHECK (word ~ '^[a-z]+$')
);

CREATE OR REPLACE FUNCTION match_required_letters()
RETURNS TRIGGER AS $$
DECLARE
	required_letters INT;
BEGIN
	SELECT letters INTO required_letters FROM private.prompts WHERE id = new.prompt_id;
	
	IF LENGTH(new.word) <> required_letters THEN
		RAISE EXCEPTION 'Word must be exactly % letters long.', required_letters;
	END IF;

	RETURN new;
END $$ LANGUAGE PLPGSQL;

CREATE TRIGGER match_required_letters
	BEFORE INSERT OR UPDATE
	ON private.submissions
	FOR EACH ROW
	EXECUTE FUNCTION match_required_letters();
