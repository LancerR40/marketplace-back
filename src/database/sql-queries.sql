USE marketplace_db;

SELECT * FROM admin;
SELECT * FROM vendor;
SELECT * FROM product;

SELECT p.IDProduct as productId, p.Name as productName, p.SKU as sku, p.Quantity as quantity, p.Price as price, v.Name as vendorName FROM product as p INNER JOIN vendor as v ON p.IDVendor = v.IDVendor;
SELECT p.IDProduct as productId, p.Name as productName, p.SKU as sku, p.Quantity as quantity, p.Price as price, v.Name as vendorName FROM product as p INNER JOIN vendor as v ON p.IDVendor = v.IDVendor WHERE v.IDVendor IN (1, 2);

DESCRIBE product;

SET FOREIGN_KEY_CHECKS=0;
TRUNCATE vendor;