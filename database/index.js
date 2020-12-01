const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/reviews', { useNewUrlParser: true, useUnifiedTopology: true } )
.then(() => {
  console.log('connected to mongo');
})
.catch((err) => {
  console.error(err);
})

const reviewSchema = new mongoose.Schema({
  product: String,
  reviews: [{
    user: String,
    text: String,
    dateCreated: Date,
    stars: Number,
    summary: String,
    helpfulCount: Number,
    ratings: {
      gameplay: Number,
      sound: Number,
      graphics: Number,
      lastingQuality: Number,
      recommended: Boolean
    }
  }],
  ratings: {
    gameplay: Number,
    sound: Number,
    graphics: Number,
    lastingQuality: Number,
    recommended: Number
  }
});

const Product = mongoose.model('Product', reviewSchema);

module.exports = Product;