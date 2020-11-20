import React from 'react';
import Review from './Review.jsx';

export default class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 3,
      buttonVisible: 'visible'
    }
    this.getMoreReviews = this.getMoreReviews.bind(this);
  }

getMoreReviews(e) {
  e.preventDefault();
  this.setState((old) => {
    return {visible: old.visible + 3}
  });
}


  render() {
    var buttonVisible = 'visible'
    if (this.state.visible > this.props.reviews.length) {
      buttonVisible = 'hidden';
    }
    return (
      <div className='ReviewList'>
        {this.props.reviews.slice(0,this.state.visible).map((review) => {
          return <Review review={review} key={review._id}/>
        })}
        <button onClick={this.getMoreReviews} style={{visibility: buttonVisible}} className='moreReviewsButton'>Load 3 more</button>
      </div>
    )
  }
}