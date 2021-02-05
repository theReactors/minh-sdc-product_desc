const pool = require('./index.js');
const path = require('path');
const fs = require('fs');
const faker = require('faker');
const dayjs = require('dayjs');

for (let i = 0; i < 4; i++) {
  let users = '', products = '', shippings = '';
  for (let j = 0; j < 2500000; j++) {
    products += `"${faker.commerce.productDescription()}","${faker.commerce.productName()}","$${faker.commerce.price()}",${faker.random.number({min: 0, max: 1000})},${faker.random.float({min: 0, max: 0.5})},${faker.random.number({min: 1, max: 100})}\n`;

    users += `"${faker.name.findName()}","${faker.internet.userName()}","${faker.address.stateAbbr()}",${faker.random.float({min:0, max: 5})}\n`;

    shippings += `"${dayjs(faker.date.future()).format('MMM D')}","${dayjs(faker.date.soon()).format('h:mm A')}","${faker.commerce.productMaterial()}"\n`;
  }
  fs.writeFile('products.csv', products, {'flag': 'a'}, err => {
    if (err) console.error(err);
  });
  fs.writeFile('users.csv', users, {'flag': 'a'}, err => {
    if (err) console.error(err);
  });
  fs.writeFile('shippings.csv', shippings, {'flag': 'a'}, err => {
    if (err) console.error(err);
  });
}

console.log('Data Generation Done');

pool.query(`COPY products(prod_desc, prod_name, prod_price, prod_sales, prod_discount, prod_stocks) FROM '${path.join(__dirname, '..', 'products.csv')}' DELIMITER ',' CSV`);

pool.query(`COPY users(user_name, account_name, user_location, user_rating) FROM '${path.join(__dirname, '..', 'users.csv')}' DELIMITER ',' CSV`);

pool.query(`COPY shippings(ship_time, delivery_time, prod_info) FROM '${path.join(__dirname, '..', 'shippings.csv')}' DELIMITER ',' CSV`);
