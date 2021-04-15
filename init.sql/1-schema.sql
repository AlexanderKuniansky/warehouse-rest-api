-- Create schemas for 3 tables
CREATE TABLE IF NOT EXISTS categories (
	   id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	   category_name VARCHAR (255) UNIQUE NOT NULL

);

CREATE TABLE IF NOT EXISTS products (
	id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	product_name VARCHAR (255) UNIQUE NOT NULL,
	product_description VARCHAR (255),
	price_per_piece REAL,
	quantity INT,
	category_id INT,
	FOREIGN KEY(category_id) 
      REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS users (
	id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	user_name VARCHAR (255) NOT NULL,
	user_login VARCHAR (255) UNIQUE NOT NULL,
	user_password VARCHAR (255) NOT NULL
);