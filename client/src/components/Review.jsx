import React from 'react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import Circle from './Circle.jsx';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpCount: this.props.review.helpfulCount,
      buttonDisable: false,
      buttonColor: 'white'
    }
    this.changeHelpCount = this.changeHelpCount.bind(this);
  }

  changeHelpCount(e) {
    e.preventDefault();
    this.setState({
      helpCount: this.state.helpCount + 1,
      buttonDisable: true,
      buttonColor: 'gray'
    }, () => {
      axios.put(`/api/products/${this.props.review._id}/review`, {helpfulCount: this.state.helpCount})
      .then((result) => {
        console.log('updated');
      })
      .catch((err) => {
        console.error(err);
      });
    });

  }

  render() {
    return (
      <div className="review">
        <div className="review-text-portion">
          <h3 className="summary">{this.props.review.summary}</h3>
          <div>{this.props.review.stars}</div>
          <div className="date">{this.props.review.user} - {this.props.review.dateCreated.slice(0, 10)}</div>
          <p className="user-text">{this.props.review.text}</p>
        </div>

        <div className="review-breakdown">
          <div className="overview">
            <div className='overview-inner'>
              <Circle rating={this.props.review.ratings.gameplay} className='circle'/><text className="text">Gameplay out of 5</text>
            </div>
            <div className='overview-inner'>
              <Circle rating={this.props.review.ratings.graphics} />
              <text className="text">Graphics out of 5</text>
            </div>
            <div className='overview-inner'>
              <Circle rating={this.props.review.ratings.sound} />
              <text className="text">Sound out of 5</text>
            </div>
            <div className='overview-inner'>
              <Circle rating={this.props.review.ratings.graphics} />
              <text className="text">Lasting Quality out of 5</text>
            </div>
          </div>

          <div className="helpsection">

            <div className='help'>
               <span>{this.state.helpCount} people found this helpful. Did you?</span>
            </div>

            <div className="buttons">
              <button onClick={this.changeHelpCount} className="helpButton" disabled={this.state.buttonDisable} style={{backgroundColor: this.state.buttonColor}}>Helpful</button><button className="helpButton2" disabled={this.state.buttonDisable} >Not Helpful</button>
            </div>

          </div>


        </div>
      </div>
    )
  }
}