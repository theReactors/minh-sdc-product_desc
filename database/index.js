const {Pool} = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  password: 'admin',
  port: 8080
});

const createTable = `
CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, user_name VARCHAR (16), account_name VARCHAR (16), user_location VARCHAR (64), user_rating INT);
CREATE TABLE IF NOT EXISTS shippings (ship_id SERIAL PRIMARY KEY, ship_time INT, delivery_time INT, prod_info VARCHAR (64));
CREATE TABLE IF NOT EXISTS products (prod_id SERIAL PRIMARY KEY, prod_desc VARCHAR (256), prod_name VARCHAR (16), prod_price INT, prod_sales INT, prod_discount INT, prod_stocks INT, user_id INT REFERENCES users (user_id), ship_id INT REFERENCES shippings (ship_id));
`;

pool.query(createTable, (err, res) => {
  if (err) console.error(err);
  pool.end();
});

module.exports = pool;