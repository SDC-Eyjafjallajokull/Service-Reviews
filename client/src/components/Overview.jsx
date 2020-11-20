import React from 'react';
import Circle from './Circle.jsx';
import ProgressBar from '../progressbar/ProgressBar.jsx';
import MainCircle from './MainCircle.jsx';
import Star from 'react-star-rating-Component';
import LoginModal from './LoginModal.jsx';


export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starAvg: 0,
      amountOfStars: 0
    }
    this.getStarAverage = this.getStarAverage.bind(this);
  }

  getStarAverage() {
    var total = 0;
    var amountOfStars = 0;
    this.props.copyOfState.reviews.forEach((review) => {
      total += review.stars;
      amountOfStars++;
    });
    var avg = total / this.props.copyOfState.reviews.length;
    var finalValue = Math.round(avg * 10) / 10;
    this.setState({
      starAvg: finalValue,
      amountOfStars: amountOfStars
    })
  }

  componentDidMount() {
    setTimeout(this.getStarAverage, 500);
  }

  render() {
    return (
      <div className="Overview">
        <h1 className='overview-header'>Guest Ratings {'&'} Reviews</h1>
        <div className='breakdown-container'>
          <div className='progress-bar-container'>
            <ProgressBar percent={this.props.copyOfState.fiveStarPercent} star='5'/>
            <ProgressBar percent={this.props.copyOfState.fourStarPercent} star='4'/>
            <ProgressBar percent={this.props.copyOfState.threeStarPercent} star='3'/>
            <ProgressBar percent={this.props.copyOfState.twoStarPercent} star='2'/>
            <ProgressBar percent={this.props.copyOfState.oneStarPercent} star='1'/>
          </div>
          <div className='overview-star-container'>
            <div className='starBox'>
              <span className='overall-star-rating'>{this.state.starAvg}</span>
              <Star name='mainStar' value={this.state.starAvg} className='main-star'/>
              <span className ='mainStarText'>{this.state.amountOfStars} star ratings</span>
            </div>
            <div className='main-circle'>
            <MainCircle rating ={this.props.copyOfState.ratings.recommended * 100} recommendations={this.props.copyOfState.recommendations}/>
            </div>
          </div>

        </div>

        <div className='ratings-breakdown'>
          <div className='ratings-breakdown-inner'>
            <Circle rating={this.props.copyOfState.ratings.gameplay} className='circle'/><text className="text">Gameplay out of 5</text>
          </div>
          <div className='ratings-breakdown-inner'>
            <Circle rating={this.props.copyOfState.ratings.graphics} className='circle'/><text className="text">Graphics out of 5</text>
          </div>
          <div className='ratings-breakdown-inner'>
            <Circle rating={this.props.copyOfState.ratings.sound} className='circle'/><text className="text">Sound out of 5</text>
          </div>
          <div className='ratings-breakdown-inner'>
            <Circle rating={this.props.copyOfState.ratings.lastingQuality} className='circle'/><text className="text">Lasting Quality out of 5</text>
          </div>


        </div>
        <LoginModal></LoginModal>
      </div>
    )
  }
}