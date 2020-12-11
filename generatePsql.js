const fsp = require('fs').promises;
const faker = require('faker');

let headerStr = 'product,reviewer,text,dateCreated,stars,summary,helpfulCount,ratingsGameplay,ratingsSound,ratingsGraphics,ratingsLastingQuality,ratingsRecommended';

var names = ['bob','bill', 'jimmy', 'armin', 'aida', 'gio', 'mylon', 'jimmy', 'sarah', 'sal', 'dill', 'goku', 'batman', 'spiderman', 'jon', 'moe', 'chelsea', 'derek', 'marcus', 'jonathan', 'drevil', 'anthony', 'hackreactorgrad'];

var keyWords = ['Ut sit amet sapien metus', 'Integer eget purus', 'Vivamus ultrices', 'Nullam nulla lectus', 'Praesent gravida', 'Pellentesque molestie mauris non libero', 'Fusce sem lorem', 'Suspendisse a mauris nec libero'];

var randomText = ['Donec sed pellentesque enim','Aliquam tortor mauris tempor vel augue ut convallis placerat sem', 'Nunc quis quam vitae risus placerat bibendum nec vel sapien.', 'Phasellus vitae lacus viverra hendrerit ante eu ornare tortor.', 'Mauris gravida malesuada lorem id eleifend.', 'Fusce facilisis est ut tempor elementum.', 'Vestibulum lacinia ex ac leo mollis sit amet dapibus libero ultrices.', 'Mauris ac semper lectus.'];
// var randomText = ['Donec sed pellentesque enim','Aliquam tortor mauris, tempor vel augue ut, convallis placerat sem', 'Nunc quis quam vitae risus placerat bibendum nec vel sapien.', 'Phasellus vitae lacus viverra, hendrerit ante eu, ornare tortor.', 'Mauris gravida malesuada lorem id eleifend.', 'Fusce facilisis est ut tempor elementum.', 'Vestibulum lacinia ex ac leo mollis, sit amet dapibus libero ultrices.', 'Mauris ac semper lectus.'];

var randomDates = [new Date(2018,11,23), new Date(2020, 8, 11), new Date(2020, 6, 24), new Date(2020,5,25), new Date(2020,5,25),new Date(2020,5,25),new Date(2020,5,25),new Date(2020,8,22),new Date(2020,9,11),new Date(2020,6,26),new Date(2020,4,15),new Date(2020,3,13),new Date(2020,6,4),new Date(2020,7,6)];


const createReview = () => {
  var review = [];
  review.push(faker.name.firstName()); // reviewer
  review.push(randomText[Math.floor(Math.random() * randomText.length)]); // text
  review.push(JSON.stringify(randomDates[Math.floor(Math.random() * randomText.length)])); // dateCreated
  review.push(Math.floor(Math.random() * 6)); // star
  review.push(keyWords[Math.floor(Math.random() * keyWords.length)]); // summary
  review.push(Math.floor(Math.random() * 15)); // helpfulCount

  review.push(Math.floor(Math.random() * 5)); // gameplay
  review.push(Math.floor(Math.random() * 6)); // sound
  review.push(Math.floor(Math.random() * 6)); // graphics
  review.push(Math.floor(Math.random() * 6)); // lastingQuality
  review.push((Math.random() <= 0.2)); // recommended

  return review.join(',');
};

const createRandomAmountOfReviews = (number, name) => {
  var reviews = [];
  for (var i = 0; i < number; i++) {
    reviews.push(`${name},${createReview()}`);
  }
  return reviews.join('\n');
}


fsp.writeFile("productsPsql.txt", headerStr)
.then(() => {
  appendToFile("productsPsql.txt");
})
.catch((err) => {
  console.error(err);
});

let appendToFile = async (path) => {
  let filehandle = null;
  try {
    filehandle = await fsp.open(path, mode = 'a');

    for (let j = 0; j < 10; j++) {
      let dataStr = '';
      let batchSize = 1000000;
      for (let i = 0; i < batchSize; i++) {
        let reviewsPerProduct = '\n';
        let product = `#${j * batchSize + i}`;
        var randomNumber = Math.floor(Math.random() * (5 - 1 + 1) + 1);
        reviewsPerProduct += createRandomAmountOfReviews(randomNumber, product);
        dataStr += reviewsPerProduct;
      };
      await filehandle.appendFile(dataStr);
    }
  } finally {
    if (filehandle) {
      await filehandle.close();
    }
  }
}

// node --max-old-space-size=4096 generatePsql.js

// \COPY reviews(product, reviewer, text, datecreated, star, summary, helpfulcount, ratingsgameplay, ratingssound, ratingsgraphics, ratingslastingquality, ratingsrecommended) FROM '~/Documents/Coding/Hack Reactor/HRLA40/SDC-Service-Reviews/productsPsql.txt' DELIMITER ',' CSV HEADER;