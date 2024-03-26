CREATE OR REPLACE FUNCTION private.get_today()
RETURNS DATE AS $$ BEGIN
	RETURN NOW() AT TIME ZONE 'PST';
END $$ LANGUAGE PLPGSQL STABLE SECURITY DEFINER;