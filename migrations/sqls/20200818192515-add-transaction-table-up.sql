/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS transaction(
    id VARCHAR PRIMARY KEY,
    order_id uuid NOT NULL,
    reference VARCHAR NOT NULL,
    amount VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    currency VARCHAR NOT NULL,
    verified VARCHAR DEFAULT 'pending',
    created_at timestamp default NOW(),
    updated_at timestamp,
    FOREIGN KEY(order_id) REFERENCES orders(id)
)