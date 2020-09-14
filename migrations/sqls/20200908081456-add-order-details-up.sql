/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS order_details(
    id uuid PRIMARY KEY,
    user_id uuid NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    phone_number VARCHAR NOT NULL,
    is_default BOOLEAN default false,
    created_at timestamp default NOW(),
    updated_at timestamp,
    FOREIGN KEY(user_id) REFERENCES users(id)
)