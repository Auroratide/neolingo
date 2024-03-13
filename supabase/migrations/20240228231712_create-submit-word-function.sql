CREATE OR REPLACE FUNCTION submit_word(
	_my_id uuid,
	_prompt_id INT,
	_word VARCHAR(255)
) RETURNS INT AS $$ 
DECLARE
	ret_id INT;
BEGIN
	IF (SELECT day FROM private.prompts WHERE id = _prompt_id) != (SELECT CURRENT_DATE AT TIME ZONE 'UTC') THEN
		RAISE EXCEPTION 'Word was submitted for a prompt other than today''s prompt. SOLUTION: Refresh the page and try again.';
	END IF;

	INSERT INTO private.submissions
		(person_id, prompt_id, word)
	VALUES
		(_my_id, _prompt_id, _word)
	RETURNING id INTO ret_id;

	RETURN ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
