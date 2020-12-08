const fsp = require('fs').promises;
const faker = require('faker');

var names = ['bob','bill', 'jimmy', 'armin', 'aida', 'gio', 'mylon', 'jimmy', 'sarah', 'sal', 'dill', 'goku', 'batman', 'spiderman', 'jon', 'moe', 'chelsea', 'derek', 'marcus', 'jonathan', 'drevil', 'anthony', 'hackreactorgrad'];

var keyWords = ['Ut sit amet sapien metus', 'Integer eget purus', 'Vivamus ultrices', 'Nullam nulla lectus', 'Praesent gravida', 'Pellentesque molestie mauris non libero', 'Fusce sem lorem', 'Suspendisse a mauris nec libero'];

var randomText = ['Donec sed pellentesque enim','Aliquam tortor mauris, tempor vel augue ut, convallis placerat sem', 'Nunc quis quam vitae risus placerat bibendum nec vel sapien.', 'Phasellus vitae lacus viverra, hendrerit ante eu, ornare tortor.', 'Mauris gravida malesuada lorem id eleifend.', 'Fusce facilisis est ut tempor elementum.', 'Vestibulum lacinia ex ac leo mollis, sit amet dapibus libero ultrices.', 'Mauris ac semper lectus.'];

var randomDates = [new Date(2018,11,23), new Date(2020, 8, 11), new Date(2020, 6, 24), new Date(2020,5,25), new Date(2020,5,25),new Date(2020,5,25),new Date(2020,5,25),new Date(2020,8,22),new Date(2020,9,11),new Date(2020,6,26),new Date(2020,4,15),new Date(2020,3,13),new Date(2020,6,4),new Date(2020,7,6)];


const createReview = () => {
  var review = {};
  review.user = names[Math.floor(Math.random() * names.length)];
  review.text = randomText[Math.floor(Math.random() * randomText.length)];
  review.dateCreated = randomDates[Math.floor(Math.random() * randomText.length)];
  review.stars = Math.floor(Math.random() * 6);
  review.summary = keyWords[Math.floor(Math.random() * keyWords.length)];
  review.helpfulCount = Math.floor(Math.random() * 15);

  review.ratings = {
    gameplay: Math.floor(Math.random() * 5),
    sound: Math.floor(Math.random() * 6),
    graphics: Math.floor(Math.random() * 6),
    lastingQuality: Math.floor(Math.random() * 6),
    recommended: (Math.random() <= 0.2)
  }
  return review;
};

const createRandomAmountOfReviews = (number) => {
  var reviews = [];
  for (var i = 0; i < number; i++) {
    reviews.push(createReview());
  }
  return reviews;
}


let dataStr = '';
for (let i = 0; i < 1000000; i++) {
  var productObj = {};
  productObj.product = faker.commerce.productName();
  var randomNumber = Math.floor(Math.random() * (5 - 1 + 1) + 1);
  var reviews = createRandomAmountOfReviews(randomNumber);
  productObj.reviews = reviews;
  dataStr += JSON.stringify(productObj);
};

fsp.writeFile("productsMongo.json", dataStr)
.then(() => {
  appendToFile("productsMongo.json");
})
.catch((err) => {
  console.error(err);
});

let appendToFile = async (path) => {
  let filehandle = null;
  try {
    filehandle = await fsp.open(path, mode = 'a');
    for (let j = 1; j < 10; j++) {
      let dataStr = '';
      for (let i = 0; i < 1000000; i++) {
        var productObj = {};
        productObj.product = faker.commerce.productName();
        var randomNumber = Math.floor(Math.random() * (5 - 1 + 1) + 1);
        var reviews = createRandomAmountOfReviews(randomNumber);
        productObj.reviews = reviews;
        dataStr += JSON.stringify(productObj);
      };
      await filehandle.appendFile(dataStr);
    }
  } finally {
    if (filehandle) {
      await filehandle.close();
    }
  }
}

// node --max-old-space-size=4096 generateMongo.js

// mongoimport --db reviews --collection products --drop --file "/Users/yimingchen/Documents/Coding/Hack Reactor/HRLA40/SDC-Service-Reviews/productsMongo.json"