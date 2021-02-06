const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const pool = require('../database/index.js');
const bodyParser = require('body-parser');
const compression = require('compression');
const app = express();
const port = 3000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/description/:id', (req, res) => {
  let id = req.body.id;
  pool.query(`SELECT * FROM products, users, shippings WHERE prod_id = ${id} AND ship_id = ${id} AND user_id = ${id};`, (err, data) => {
    if (err) console.error(err);
    res.send(data.rows);
  });
});

app.get('/inner/:id', (req, res) => {
  let id = req.body.id;
  pool.query(`SELECT * FROM products INNER JOIN users ON products.prod_id = users.user_id INNER JOIN shippings ON products.prod_id = shippings.ship_id WHERE prod_id = ${id};`, (err, data) => {
    if (err) console.error(err);
    res.send(data.rows);
  });
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});