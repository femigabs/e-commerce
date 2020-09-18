/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS orders(
    id uuid,
    user_id uuid,
    cart_id uuid NOT NULL,
    product_id uuid NOT NULL REFERENCES product(id),
    quantity int DEFAULT 1,
    price int NOT NULL,
    sub_total int NOT NULL,
    created_at timestamp default NOW(),
    updated_at timestamp,
    FOREIGN KEY(user_id) REFERENCES users(id)
)