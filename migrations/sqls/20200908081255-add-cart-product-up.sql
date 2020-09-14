/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS cart_product (
    id uuid PRIMARY KEY,
    cart_id uuid NOT NULL REFERENCES cart(id) ON UPDATE CASCADE ON DELETE CASCADE,
    product_id uuid NOT NULL REFERENCES product(id),
    quantity int DEFAULT 1,
    price int NOT NULL,
    sub_total int NOT NULL,
    created_at timestamp default NOW(),
    updated_at timestamp
)