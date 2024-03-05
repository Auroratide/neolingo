CREATE OR REPLACE FUNCTION get_dictionary()
RETURNS TABLE (
	word VARCHAR(255),
	definition TEXT,
	day DATE
) AS $$ BEGIN
	RETURN QUERY SELECT
		d.word,
		p.text,
		p.day
	FROM private.dictionary d
	LEFT JOIN private.prompts p ON d.prompt_id = p.id
	ORDER BY p.day DESC;
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
