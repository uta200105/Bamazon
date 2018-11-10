DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (

id INTEGER AUTO_INCREMENT NOT NULL,

product_name VARCHAR(50) NOT NULL,

department_name VARCHAR(30) NOT NULL,

price INTEGER(10),

stock_quantity INTEGER,

PRIMARY KEY (id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("banana", produce, 1, 50);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("milk", dairy, 3, 100);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("onions", produce, 1, 75);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("shrimp", poultry, 7, 35);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("steak", poultry, 10, 25);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("bread", deli, 3, 65);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("cheese", deli, 4, 30);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("mustard", condiments, 2, 20);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("eggs", dairy, 5, 50);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("jelly", condiments, 2, 15);

SELECT * FROM products;