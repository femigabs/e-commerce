/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS sub_category (
    id uuid PRIMARY KEY,
    category_id uuid not null,
    product_sub_category varchar not null,
    description varchar not null,
    created_at timestamp default NOW(),
    updated_at timestamp,
    FOREIGN KEY(category_id) REFERENCES category(id) ON UPDATE CASCADE ON DELETE CASCADE
);