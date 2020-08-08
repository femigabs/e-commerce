/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS product( 
    id uuid PRIMARY KEY,
    sub_category_id  uuid NOT NULL,
    product_name VARCHAR NOT NULL UNIQUE,
    status VARCHAR Default 'in_stock',
    quantity int DEFAULT 1,
    price int NOT NULL, 
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at timestamp,
    FOREIGN KEY(sub_category_id) REFERENCES sub_category(id) ON UPDATE CASCADE ON DELETE CASCADE
);