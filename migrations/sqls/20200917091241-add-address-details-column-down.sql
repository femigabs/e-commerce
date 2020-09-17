/* Replace with your SQL commands */
ALTER TABLE orders
    DROP COLUMN IF EXISTS name;

ALTER TABLE orders
    DROP COLUMN IF EXISTS address;

ALTER TABLE orders
    DROP COLUMN IF EXISTS phone_number;