/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS category (
  id uuid PRIMARY KEY,
  product_type varchar not null,
  description varchar not null,
  created_at timestamp default NOW(),
  updated_at timestamp
);