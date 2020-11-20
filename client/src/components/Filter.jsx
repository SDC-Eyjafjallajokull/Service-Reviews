import React from 'react';
import Select from 'react-select';
const options = [
  {  value: 5, label: '5 star' },
  {  value: 4, label: '4 star' },
  {  value: 3, label: '3 star' },
  {  value: 2, label: '2 star'},
  {  value: 1, label: '1 star'}
];

const optionsForFilterByDate = [
  {value: 'recent', label: 'most recent'},
  {value: 'highest', label: 'highest rated'},
  {value: 'lowest', label: 'lowest rated'},
  {value: 'helpful', label: 'most helpful'}
]

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
    this.filterByStars = this.filterByStars.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.sortReviews = this.sortReviews.bind(this);
  }

filterByStars(selected) {
  this.props.reset()
  .then(() => {
    var value = selected.value;
    this.setState({value: value}, () => {
      var filtered = this.props.reviews.filter((review) => {
        if (review.stars === value) {
          return review;
        }
      });
      this.props.filterReviews(filtered);
    });
  })
  .catch((err) => {
    console.error(err);
  })

}

sortReviews(selected) {
  var value = selected.value;
  console.log(value);
  if (value === 'recent') {
    var filtered = this.props.reviews.sort((a,b) => {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    })
    this.props.filterReviews(filtered);
  } else if (value === 'highest') {
    var filtered = this.props.reviews.sort((a,b) => {
      return b.stars - a.stars;
    })
    this.props.filterReviews(filtered);
  } else if (value === 'lowest') {
    var filtered = this.props.reviews.sort((a,b) => {
      return a.stars - b.stars;
    });
    this.props.filterReviews(filtered);
  } else if (value === 'helpful') {
    var filtered = this.props.reviews.sort((a,b) => {
      return b.helpfulCount - a.helpfulCount;
    });
    this.props.filterReviews(filtered);
  }
}


resetFilters(e) {
  e.preventDefault();
  this.props.reset();
}





  render() {
    return (
      <div className="filterBar">
        <Select options={optionsForFilterByDate} placeholder='sort by most recent' className='filter-stars' onChange={this.sortReviews}/>
        <Select options={options} placeholder='filter by all ratings' className='filter-stars' onChange={this.filterByStars} />
        <button className='clear-filter-button' onClick={this.resetFilters}>x</button>
      </div>


    )
  }
}