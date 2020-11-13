const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/reviews')
.then(() => {
  console.log('connected to mongo');
});

const reviewSchema = new mongoose.Schema({
  product: String,
  reviews: [{
    user: String,
    text: String,
    dateCreated: Date,
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