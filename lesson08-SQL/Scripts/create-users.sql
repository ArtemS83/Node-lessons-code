CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	name VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255),
	token VARCHAR(30),
	gender INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (gender) REFERENCES genders (id)
	      ON DELETE SET NULL
	      ON UPDATE SET NULL
);