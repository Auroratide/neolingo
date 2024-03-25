CREATE OR REPLACE FUNCTION get_prompt_for_today()
RETURNS TABLE (
	id INT,
	day DATE,
	text TEXT
) AS $$ BEGIN
	RETURN QUERY SELECT
		prompts.id,
		prompts.day,
		prompts.text
	FROM private.prompts
	WHERE prompts.day = (SELECT private.get_today());
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION submit_word(
	_my_id uuid,
	_prompt_id INT,
	_word VARCHAR(255)
) RETURNS INT AS $$ 
DECLARE
	ret_id INT;
BEGIN
	IF (SELECT day FROM private.prompts WHERE id = _prompt_id) != (SELECT private.get_today()) THEN
		RAISE EXCEPTION 'Word was submitted for a prompt other than today''s prompt. SOLUTION: Refresh the page and try again.';
	END IF;

	INSERT INTO private.submissions
		(person_id, prompt_id, word)
	VALUES
		(_my_id, _prompt_id, _word)
	RETURNING id INTO ret_id;

	RETURN ret_id;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_votable_words()
RETURNS TABLE (
	id INT,
	text VARCHAR(255),
	tally BIGINT
) AS $$ BEGIN
	RETURN QUERY
	SELECT w.id, w.text, COUNT(v.*) AS tally
	FROM private.words w
	LEFT JOIN private.votes v ON w.id = v.word_id
	WHERE w.prompt_id IN (
		SELECT p.id FROM private.prompts p WHERE day = (SELECT private.get_today())
	)
	GROUP BY w.id, w.text;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION submit_vote(
	_my_id uuid,
	_prompt_id INT,
	_word_id INT
) RETURNS INT AS $$ 
DECLARE
	ret_id INT;
BEGIN
	IF (SELECT day FROM private.prompts WHERE id = _prompt_id) != (SELECT private.get_today()) THEN
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

