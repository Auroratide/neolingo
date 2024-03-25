ALTER TABLE private.dictionary
	ADD CONSTRAINT unique_prompt_id_in_dictionary
	UNIQUE (prompt_id);
