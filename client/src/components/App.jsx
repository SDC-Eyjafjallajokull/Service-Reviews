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
      oneStarPercent: 0
    }
    this.getReviews = this.getReviews.bind(this);
    this.filterReviews = this.filterReviews.bind(this);
    this.getPercentagesForStars = this.getPercentagesForStars.bind(this);
  }


  getReviews() {
    return axios.get('api/products/5faed4ff9bac92157aba56f4')
    .then((product) => {

      this.setState({
        product: product.data,
        reviews: product.data.reviews,
        ratings: product.data.ratings
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
    var obj = {total: 0}
    // this.state.reviews.forEach((review) => {
    //   if (review.stars === 0) {
    //     continue
    //   } else if (obj[review.stars] === undefined) {
    //     obj[review.stars] = review.stars
    //     obj.total++
    //   } else {
    //     obj[review.stars]++;
    //     obj.total++
    //   }
    // });
    this.setState({
      fiveStarPercent: obj[5]/obj.total * 100,
      fourStarPercent: obj[4]/obj.total * 100,
      threeStarPercent: obj[3]/obj.total * 100,
      twoStarPercent: obj[2]/obj.total * 100,
      oneStarPercent: obj[1]/obj.total * 100,
    })
  }

  componentDidMount() {
    this.getReviews()
    .then(() => {
      this.getPercentagesForStars();
    })
  };

  render() {
    return (
      <div>
        <Overview />
        <Filter reviews={this.state.reviews} filterReviews={this.filterReviews} reset={this.getReviews}/>
        <div className='howManyReviewsText'>We found {this.state.reviews.length} matching reviews</div>
        <ReviewList reviews={this.state.reviews} className="ReviewList"/>
      </div>
    )
  }
}
