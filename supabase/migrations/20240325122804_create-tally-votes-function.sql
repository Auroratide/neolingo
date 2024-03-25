CREATE OR REPLACE FUNCTION private.tally_votes(
	_prompt_id INT
) RETURNS void AS $$ 
BEGIN
	UPDATE private.words w
		SET tally = (SELECT COUNT(*) FROM private.votes v WHERE v.word_id = w.id)
		WHERE w.prompt_id = _prompt_id;
	
	INSERT INTO private.dictionary (prompt_id, word)
		SELECT _prompt_id, w.text
		FROM private.words w
		WHERE w.prompt_id = _prompt_id
		ORDER BY w.tally DESC, RANDOM()
		LIMIT 1;
END $$ LANGUAGE PLPGSQL VOLATILE SECURITY DEFINER;
