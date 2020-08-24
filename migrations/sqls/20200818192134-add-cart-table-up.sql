/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS cart (
    id uuid PRIMARY KEY,
    user_id uuid not null,
    product_id uuid not null,
    quantity int DEFAULT 1,
    price int NOT NULL,
    sub_total int NOT NULL,
    created_at timestamp default NOW(),
    updated_at timestamp,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(product_id) REFERENCES product(id)
);