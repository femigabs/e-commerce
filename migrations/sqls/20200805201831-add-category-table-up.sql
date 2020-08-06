/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS category (
  id uuid,
  name varchar not null PRIMARY KEY,
  description varchar not null,
  created_at timestamp default NOW(),
  updated_at timestamp
);