/* Replace with your SQL commands */
ALTER TABLE orders
    ADD IF NOT EXISTS name VARCHAR;

ALTER TABLE orders
    ADD IF NOT EXISTS address VARCHAR;

ALTER TABLE orders    
    ADD IF NOT EXISTS phone_number VARCHAR;

ALTER TABLE orders  
    ADD IF NOT EXISTS transaction_id uuid REFERENCES transaction(id);