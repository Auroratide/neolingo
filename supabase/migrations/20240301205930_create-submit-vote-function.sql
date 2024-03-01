CREATE OR REPLACE FUNCTION submit_vote(
	_my_id uuid,
	_prompt_id INT,
	_word_id INT
) RETURNS INT AS $$ 
DECLARE
	ret_id INT;
BEGIN
	IF (SELECT day FROM private.prompts WHERE id = _prompt_id) != (SELECT CURRENT_DATE AT TIME ZONE 'UTC') THEN
		RAISE EXCEPTION 'Voting period for this prompt has already passed. SOLUTION: Refresh the page and try again.';
	END IF;

	INSERT INTO private.votes
		(person_id, prompt_id, word_id)
	VALUES
		(_my_id, _prompt_id, _word_id)
	ON CONFLICT (person_id, prompt_id)
	DO UPDATE SET word_id = _word_id
	RETURNING id INTO ret_id;

	RETURN ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
