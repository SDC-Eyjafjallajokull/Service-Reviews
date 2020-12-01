import React from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import Filter from './Filter.jsx';
import Overview from './Overview.jsx';



export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      reviews: [],
      ratings: {},
      fiveStarPercent: 0,
      fourStarPercent: 0,
      threeStarPercent: 0,
      twoStarPercent: 0,
      oneStarPercent: 0,
      recommendations: 0,
      modalIsOpen: false
    }
    this.getReviews = this.getReviews.bind(this);
    this.filterReviews = this.filterReviews.bind(this);
    this.getPercentagesForStars = this.getPercentagesForStars.bind(this);
    this.getNumberOfRecommended = this.getNumberOfRecommended.bind(this);

  }


  getReviews() {
    return axios.get('api/products')
    .then((product) => {
      console.log(product);
      this.setState({
        product: product.data[0],
        reviews: product.data[0].reviews,
        ratings: product.data[0].ratings
      });
    })
    .catch((err) => {
      console.error(err);
    })
  };

  filterReviews(arrayOfReviews) {
    this.setState({
      reviews: arrayOfReviews
    });
  }

  getPercentagesForStars() {
    var obj = {total: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    this.state.reviews.forEach((review) => {
      if (review.stars === 0) {
        console.log(0);
      } else if (obj[review.stars] === undefined) {
        obj[review.stars] = 1;
        obj.total++
      } else {
        obj[review.stars]++;
        obj.total++
      }
    });
    console.log(obj);
    this.setState({
      fiveStarPercent: (obj[5]/obj.total * 100).toFixed(1),
      fourStarPercent: (obj[4]/obj.total * 100).toFixed(1),
      threeStarPercent: (obj[3]/obj.total * 100).toFixed(1),
      twoStarPercent: (obj[2]/obj.total * 100).toFixed(1),
      oneStarPercent: (obj[1]/obj.total * 100).toFixed(1)
    })
  }

  componentDidMount() {
    this.getReviews()
    .then(() => {
      this.getPercentagesForStars();
    })
    .then(() => {
      this.getNumberOfRecommended();
    })
  };

  getNumberOfRecommended() {
    var count = 0;
    this.state.reviews.forEach((review) => {
      if (review.ratings.recommended) {
        count++;
      }
    });
    this.setState({recommendations: count});
  }



  render() {
    return (
      <div>

        <Overview copyOfState={this.state}/>
        <Filter reviews={this.state.reviews} filterReviews={this.filterReviews} reset={this.getReviews}/>
        <div className='howManyReviewsText'>We found {this.state.reviews.length} matching reviews</div>
        <ReviewList reviews={this.state.reviews} className="ReviewList"/>

      </div>

    )
  }
}
