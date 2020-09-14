/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS transaction(
    id uuid,
    user_id uuid REFERENCES users(id) NOT NULL,
    payment_id VARCHAR,
    reference VARCHAR NOT NULL,
    amount VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    currency VARCHAR NOT NULL,
    verified VARCHAR DEFAULT 'pending',
    created_at timestamp default NOW(),
    updated_at timestamp
)