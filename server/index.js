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

app.get('description/:id', (req, res) => {
  pool.query('SELECT prod_name FROM products WHERE prod_id = 1337', (err, data) => {
    if (err) console.error(err);
    res.send(data.rows);
  });
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});