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
	WHERE prompts.day = (SELECT CURRENT_DATE AT TIME ZONE 'UTC');
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;
