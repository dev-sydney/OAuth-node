CREATE TABLE oauth_users
(
	user_id  SERIAL PRIMARY KEY,
	email_address VARCHAR(100) NOT NULL UNIQUE,
	user_name VARCHAR(100) NOT NULL,
	created_at TIMESTAMP
);