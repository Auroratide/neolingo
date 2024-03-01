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
		SELECT p.id FROM private.prompts p WHERE day = (SELECT CURRENT_DATE AT TIME ZONE 'UTC')
	)
	GROUP BY w.id, w.text;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
