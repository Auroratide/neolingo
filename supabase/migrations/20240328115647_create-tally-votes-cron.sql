SELECT cron.schedule(
	'tally-votes-for-the-day',
	'5 8 * * *', -- every day at 12:05 AM (PST)
	$$
		SELECT private.tally_votes(
			(SELECT id FROM private.prompts WHERE day = (SELECT private.get_today() - 1)
		));
	$$
);
