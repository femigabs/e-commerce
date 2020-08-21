/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS orders(
    id uuid PRIMARY KEY,
    user_id uuid NOT NULL,
    total_price int, 
    created_at timestamp default NOW(),
    updated_at timestamp,
    FOREIGN KEY(user_id) REFERENCES users(id)
)