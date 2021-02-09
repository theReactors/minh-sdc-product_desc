const pool = require('./index.js');

const createTable = `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS shippings;

CREATE TABLE users (user_id SERIAL PRIMARY KEY, user_name VARCHAR (128), account_name VARCHAR (128), user_location VARCHAR (16), user_rating NUMERIC(2,1));

CREATE TABLE products (prod_id SERIAL PRIMARY KEY, prod_desc VARCHAR (256), prod_name VARCHAR (128), prod_price VARCHAR(16), prod_sales INT, prod_discount NUMERIC(2,1), prod_stocks INT);

CREATE TABLE shippings (ship_id SERIAL PRIMARY KEY, ship_time VARCHAR(16), delivery_time VARCHAR(16), prod_info VARCHAR (128));
`;

pool.query(createTable, err => {
  if (err) console.error(err);
});

pool.end();