CREATE SCHEMA IF NOT EXISTS private;

CREATE TABLE private.prompts (
	id SERIAL PRIMARY KEY,
	day DATE UNIQUE NOT NULL,
	text TEXT NOT NULL,
	letters SMALLINT NOT NULL
);
