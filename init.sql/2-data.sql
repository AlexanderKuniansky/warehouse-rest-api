-- Fill tables with example data to play with
INSERT INTO categories(category_name)
VALUES  ('Food'),
		('Tools'),
		('Brooms'),
		('Other food')
ON CONFLICT DO NOTHING;

INSERT INTO products(product_name,product_description,price_per_piece,quantity,category_id)
VALUES ('onion','onions are tasty',5.43,123,1),
       ('not onion','onions are tasty',5.43,123,1),
	   ('pepper','peppery',NULL,NULL,NULL),
	   ('Broomiest broom',NULL,NULL,NULL,3)
ON CONFLICT DO NOTHING;

INSERT INTO users(user_name,user_login,user_password)
VALUES ('Smart user','Smarty','jk9as87&^dASDjk2as5diU723'),
       ('Stupid user','Stupido','1234')
ON CONFLICT DO NOTHING;