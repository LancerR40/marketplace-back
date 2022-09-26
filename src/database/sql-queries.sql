USE marketplace_db;

SELECT * FROM admin;
SELECT * FROM vendor;
SELECT * FROM product;

SELECT p.IDProduct as productId, p.Name as productName, p.SKU as sku, p.Quantity as quantity, p.Price as price, v.Name as vendorName FROM product as p INNER JOIN vendor as v ON p.IDVendor = v.IDVendor;
SELECT p.IDProduct as productId, p.Name as productName, p.SKU as sku, p.Quantity as quantity, p.Price as price, v.Name as vendorName FROM product as p INNER JOIN vendor as v ON p.IDVendor = v.IDVendor WHERE v.IDVendor IN (1, 2);

SELECT * FROM product WHERE Name LIKE '%' AND SKU LIKE '%' AND Price >= 4 AND Price <= 5;

SELECT p.IDProduct as productId, p.Name as productName, p.SKU as sku, p.Quantity as quantity, p.Price as price, v.Name as vendorName FROM product as p INNER JOIN vendor as v ON p.IDVendor = v.IDVendor WHERE (p.Name LIKE "%" OR p.SKU LIKE "%") AND (p.Price >= 4 AND p.Price <= 5);

DESCRIBE admin;

SET FOREIGN_KEY_CHECKS=0;
TRUNCATE vendor;