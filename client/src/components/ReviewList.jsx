import React from 'react';
import Review from './Review.jsx';

export default class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }




  render() {
    return (
      <div className='ReviewList'>
        {this.props.reviews.map((review) => {
          return <Review review={review} key={review._id}/>
        })}
      </div>
    )
  }
}