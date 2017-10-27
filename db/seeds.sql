DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS news;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  token VARCHAR NOT NULL
);

CREATE TABLE news (
	id SERIAL PRIMARY KEY,
	search_term VARCHAR,
	user_id INT REFERENCES users(id)
	);

INSERT INTO news (search_term) VALUES ('Donald Trump'), ('climate'), ('opioid');