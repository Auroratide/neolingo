INSERT INTO private.prompts
	(day, text, letters)
VALUES
	(CURRENT_DATE, 'a hike or journey taken during the transition from night to dawn', 6),
	(CURRENT_DATE + 1, 'optical illusions induced by refraction through water', 7),
	(CURRENT_DATE + 2, 'the feeling of peace and comfort one may get when surrounded by nature', 8),
	(CURRENT_DATE + 3, 'a hike or journey taken during the transition from night to dawn', 6),
	(CURRENT_DATE + 4, 'optical illusions induced by refraction through water', 7),
	(CURRENT_DATE + 5, 'the feeling of peace and comfort one may get when surrounded by nature', 8),
	(CURRENT_DATE + 6, 'a hike or journey taken during the transition from night to dawn', 6),
	(CURRENT_DATE + 7, 'optical illusions induced by refraction through water', 7),
	(CURRENT_DATE + 8, 'the feeling of peace and comfort one may get when surrounded by nature', 8);

DO $$
	DECLARE alice uuid;
	DECLARE byakuren uuid;
	DECLARE cirno uuid;
	DECLARE doremy uuid;
	DECLARE eirin uuid;
	DECLARE flandre uuid;
BEGIN
	INSERT INTO private.people DEFAULT VALUES RETURNING id INTO alice;
	INSERT INTO private.people DEFAULT VALUES RETURNING id INTO byakuren;
	INSERT INTO private.people DEFAULT VALUES RETURNING id INTO cirno;
	INSERT INTO private.people DEFAULT VALUES RETURNING id INTO doremy;
	INSERT INTO private.people DEFAULT VALUES RETURNING id INTO eirin;
	INSERT INTO private.people DEFAULT VALUES RETURNING id INTO flandre;

	INSERT INTO private.submissions
		(person_id, prompt_id, word)
	VALUES
		(alice, 1, 'dawner'),
		(byakuren, 1, 'nihike'),
		(cirno, 1, 'strong'),
		(doremy, 1, 'dreami'),
		(eirin, 1, 'amblit'),
		(flandre, 1, 'derire');
END $$;
