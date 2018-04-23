DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(3,2) NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);
INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("milk","Food","2","4");

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("chips","Food","3","7");

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("juice","Food","2","20");

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("shirt","Clothes","6","20");

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("shoes","Clothes","15","13");

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("socks","Clothes","5","40");

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("phone","Electronics","100","9");

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("head-phone","Electronics","10","30");

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("computer","Electronics","200","3");

INSERT INTO products (product_name , department_name , price , stock_quantity)
VALUES ("TV","Electronics","300","4");
