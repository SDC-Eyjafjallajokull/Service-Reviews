require('newrelic');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const server = express();

const port = 3001;
server.listen(port, () => {
  console.log('connected to server and listening on port 3001');
});
server.use(express.static(path.join(__dirname, '../client/dist')));
server.use(bodyparser.json());
server.use(bodyparser.urlencoded({extended: true}));
server.use(cors());
// server.use(morgan('dev'));

// connect to db
const { Client } = require('pg');
const connectionString = 'postgresql://ec2-user:manuals@3.101.26.248:5432/product_reviews';
const client = new Client({ connectionString });
client.connect()
  .then(() => {
    console.log('connected to psql');
  })
  .catch((err) => {
    console.error(err);
  });

// using product as identifier
server.get('/api/products/:id', (req, res) => {
  client.query('SELECT * FROM reviews WHERE product = $1', [ `#${req.params.id}` ])
    .then(result => {
      res.status(200).send(result.rows);
    })
    .catch(err => {
      res.status(404).send(err);
    });
});
// server.get('/api/products/:id', (req, res) => {
//   Product.find({ product: req.params.id })
//   .then((products) => {
//     res.status(200).json(products);
//   })
//   .catch((err) => {
//     res.status(404).send(err);
//   });
// });

// using reviews._id as identifier
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

// using _id as identifier
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