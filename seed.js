const Product = require('./database/index.js');
const mongoose =  require('mongoose');

var names = ['bob','bill', 'jimmy', 'armin', 'aida', 'gio', 'mylon', 'jimmy', 'sarah', 'sal', 'dill', 'goku', 'batman', 'spiderman', 'jon', 'moe', 'chelsea', 'derek', 'marcus', 'jonathan', 'drevil', 'anthony', 'hackreactorgrad'];
var gameNames = ['Madden20', 'Madden21', 'Pokemon Shield', 'Pokemon Sword', 'Just Dance 2021', 'Dirt 5', 'Watch Dogs: Legion', 'FIFA 21', "Bugsnax", 'Cyberpunk 2077', 'Skyrim', 'The Witcher 3', 'Resident Evil 2', 'Resident Evil 3', 'Death Stranding', 'Devil May Cry 5', 'Mortal Kombat 11', 'Fire Emblem Three Houses', 'Gears 5', 'Outer Worlds', 'Astral Chain', 'Super Mario Maker 2', 'Anthem', 'Crackdown 3', 'NBA 2k20', 'Seikiro: Shadows Die Twice', 'Red Dead Redemption 2', 'Tetris Effect', 'Monster Hunter: World - Iceborne', 'Borderlands 3', 'Kingdom Hearts 3', 'Super Smash Bros: Ultimate', 'Star Wars Jedi: Fallen Order', 'Luigi"s Mansion', 'Mario Kart 8 Deluxe', 'Fifa 20', 'Minecraft: Nintendo Switch Edition', 'Apex Legends', 'Yakuza Kiwami', 'The Lego Movie 2 Videogame', 'Left Alive', 'Overload', 'Hypnospace Outlaw', 'Spider Man', 'Avengers', 'Sonic Racing', 'Minescraft', 'Spider-Man: Miles Morales', 'MLB The Show 20', 'Yakuza: Like A Dragon', 'Destroy All Humans!', 'Mortal Kombat XL', 'NFS Heat', 'UFC 4', 'LEGO Jurassic World', 'NHL 21', 'WWE 2K20', 'God Of War', 'NHL 20', 'Jumanji The Videogame:', 'PGA Tour 2K21', 'The Sims 4', 'Fortnite: Darkfire Bundle', 'Ghost of Tsushima', 'Spyro Reignited Trilogy', 'Persona 5 Royal', 'WWE 2K Battlegrounds', 'Race With Ryan', 'The Last Of Us Part 2', 'Cobra Kai', 'Doom Eternal', 'Overwatch', 'Hitman 2', 'Dragon Ball Z: Kakarot', 'Far Cry 5', 'MediEvil', 'Rage 2', 'Maneater', 'Wreckfest', 'Control', 'Battlefield 1', 'Planet Coaster', 'Mortal Shell', 'RBI Baseball 19', 'Poison Control', 'FIFA 19', 'Family Feud', 'Risk of Rain 2', 'WatchDogs 2', 'No Straight Roads', 'Titanfall 2', 'World War Z', 'Nioh 2', 'Budget Cuts', 'Maid of Sker', 'FIFA 18', 'Madden 18', 'Madden 19', 'Mario Odyssey', 'Mass Effect'];

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

const getRatingData = (object) => {
  var ratingData = {
    gameplay: 0,
    sound: 0,
    graphics: 0,
    lastingQuality: 0,
    recommended: 0
  }
  object.reviews.forEach((review) => {
    for (var key in review.ratings) {
      if (key === 'recommended' && review.ratings[key] === true) {
        ratingData[key] += 1;
      } else {
        ratingData[key] += review.ratings[key];
      }

    }
  });
  return ratingData;
}


var products = gameNames.map((item) => {
  var productObj = {};
  productObj.product = item;
  var randomNumber = Math.floor(Math.random() * 30);
  var reviews = createRandomAmountOfReviews(randomNumber);
  productObj.reviews = reviews;
  var ratingData = getRatingData(productObj);
  for (var key in ratingData) {
    var newVal = ratingData[key] / reviews.length;
    var rounded = Math.round(newVal * 10) / 10;
    ratingData[key] = rounded;
  }
  productObj.ratings = ratingData;
  return productObj;

});



products.forEach((product) => {
  Product.create(product)
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
  })
});

