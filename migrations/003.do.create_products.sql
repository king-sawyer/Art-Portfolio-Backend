CREATE TABLE products(
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    product_title TEXT NOT NULL,
    price INTEGER NOT NULL,
    size TEXT,
    category TEXT,
    product_image TEXT NOT NULL
)