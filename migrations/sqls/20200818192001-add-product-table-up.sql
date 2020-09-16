/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS product( 
    id uuid PRIMARY KEY,
    sub_category_id uuid not null,
    product_name VARCHAR NOT NULL UNIQUE,
    description VARCHAR NOT NULL,
    status VARCHAR Default 'in_stock',
    quantity int DEFAULT 1,
    price int NOT NULL,
    product_image VARCHAR,  
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at timestamp
);