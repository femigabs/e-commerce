/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS cart (
    id uuid PRIMARY KEY,
    user_id uuid not null REFERENCES users(id),
    created_at timestamp default NOW(),
    updated_at timestamp
);
