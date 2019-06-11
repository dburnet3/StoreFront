DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Guitar", "Instruments", 100.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Piano", "Instruments", 1000.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Violen", "Instruments", 400.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Concealer", "Beauty", 50.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Foundation", "Beauty", 70.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mascara", "Beauty", 40.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Becoming", "Books", 20.00, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cather in the Rye", "Books", 15.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headphones", "Electronics", 100.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Microphone", "Electronics", 200.00, 3);


