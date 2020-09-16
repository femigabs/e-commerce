/* Replace with your SQL commands */
ALTER TABLE product
ADD IF NOT EXISTS product_sub_category VARCHAR REFERENCES sub_category(product_sub_category) ON UPDATE CASCADE ON DELETE CASCADE;