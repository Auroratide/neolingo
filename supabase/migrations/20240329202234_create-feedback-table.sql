CREATE TABLE private.feedback (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	created TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
	topic VARCHAR(255) NOT NULL,
	text VARCHAR(3000) NOT NULL
)
