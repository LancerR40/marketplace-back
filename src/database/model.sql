CREATE DATABASE marketplace_db;
USE marketplace_db;

CREATE TABLE vendor (
	IDVendor  INT PRIMARY KEY AUTO_INCREMENT,
    Email     VARCHAR(255) NOT NULL,
	Password  VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product (
	IDProduct INT PRIMARY KEY AUTO_INCREMENT,
    IDVendor  INT NOT NULL,
    Name      VARCHAR(45) NOT NULL,
    SKU       VARCHAR(10) NOT NULL,
    Quantity  INT NOT NULL,
    Price     DECIMAL NOT NULL,
    FOREIGN KEY (IDVendor) REFERENCES vendor(IDVendor)
);

CREATE TABLE admin (
	IDAdmin INT PRIMARY KEY AUTO_INCREMENT,
    Email     VARCHAR(255) NOT NULL,
	Password  VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);