const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const Product = require('../database/index.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const server = express();

const port = 3000;
server.listen(port, () => {
  console.log('connected to server and listening on port 3000');
});
server.use(express.static(path.join(__dirname, '../client/dist')));
server.use(bodyparser.json());
server.use(bodyparser.urlencoded({extended: true}));
server.use(cors());
server.use(morgan('dev'));

mongoose.connect('mongodb://localhost/reviews', { useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => {
  console.log('connected to mongo');
})
.catch((err) => {
  console.error(err);
})

server.get('/api/products', (req, res) => {
  Product.find({})
  .then((products) => {
    res.status(200).json(products);
  })
  .catch((err) => {
    res.status(404).send(err);
  });
});

server.put('/api/products/:id/review', (req, res) => {
  Product.update({"reviews._id": req.params.id}, {"$set": {
    'reviews.$.helpfulCount': req.body.helpfulCount
  }})
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((err) => {
    res.status(400).send(err);
  });
});

server.delete('/api/products/:id', (req, res) => {
  Product.findOneAndDelete({ "_id": req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

server.post('/api/products', (req, res) => {
  Product.create(req.body.product)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});