const express = require('express');
const server = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const port = 3000;
const Product = require('../database/index.js');



server.use(bodyparser.json());
server.use(bodyparser.urlencoded({extended: true}));
server.use(cors());
server.use(morgan('dev'));

server.use('/api/products/:id', (req, res) => {
  Product.findOne({_id: req.params.id})
  .then((product) => {
    res.status(200).json(product);
  })
  .catch((err) => {
    res.status(404).send(err);
  });
});



server.listen(port, () => {
  console.log('connected to server and listening on port 3000');
});

