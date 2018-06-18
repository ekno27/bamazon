 create database bamazon_db;
 
 use bamazon_db;
 
 create table products(
	
	item_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(7,2),
    stock_quantity INT

 );
 

 
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Despacito burger", "food","10.00",10);
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Call me Maybe socks", "clothing","5.00",10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Sweet escape Pad Thai", "food","8.00",10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Baby Baby Baby Ointment", "clothing","5.00",10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("My Anaconda Donuts", "food","4000.00",10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("One more nightlight", "electronics","30.00",10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Humble-bees", "pets","5.00",10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Shape of U-haul van", "transportation","10000.00",10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("The thong song...thong", "clothing","25.00",10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ("Redbone steak", "food","99999.99",10);

UPDATE products SET stock_quantity = 10 where item_id = 4;

SELECT * from products where item_id=4;

 SELECT  product_name ,stock_quantity FROM products WHERE stock_quantity < 5;





