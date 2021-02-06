const {Pool} = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  password: 'admin',
  port: 8080
});

const createTable = `
CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, user_name VARCHAR (128), account_name VARCHAR (128), user_location VARCHAR (16), user_rating NUMERIC(2,1));

CREATE TABLE IF NOT EXISTS products (prod_id SERIAL PRIMARY KEY, prod_desc VARCHAR (256), prod_name VARCHAR (128), prod_price VARCHAR(16), prod_sales INT, prod_discount NUMERIC(2,1), prod_stocks INT);

CREATE TABLE IF NOT EXISTS shippings (ship_id SERIAL PRIMARY KEY, ship_time VARCHAR(16), delivery_time VARCHAR(16), prod_info VARCHAR (128));
`;

pool.query(createTable, (err) => {
  if (err) console.error(err);
});

pool.end();