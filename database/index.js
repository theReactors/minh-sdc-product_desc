const {Pool} = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  password: 'admin',
  port: 8080
});

const createTable = `
CREATE TABLE IF NOT EXISTS user (user_id SERIAL PRIMARY KEY, user_name VARCHAR (16), account_name VARCHAR (16), user_location VARCHAR (64), user_rating INT);
CREATE TABLE IF NOT EXISTS product (prod_id SERIAL PRIMARY KEY, prod_desc VARCHAR (256), prod_name VARCHAR (16), prod_price INT, prod_sales INT, prod_discount INT, prod_stocks INT, user_id FOREIGN KEY, ship_id FOREIGN KEY);
CREATE TABLE IF NOT EXISTS shipping (ship_id SERIAL PRIMARY KEY, ship_time INT, delivery_time INT, prod_info VARHAR (64));
`;

pool.query(createTable, (err, res) => {
  if (err) console.error(err);
  pool.end();
});

module.exports = pool;