import React from 'react';




export default class Circle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }

  }





  render() {
    var color = 'green';
    var value = this.props.rating;
    if (this.props.rating === 2 || this.props.rating === 1) {
      color = 'orange'
    }


    return (
      <div>
        <svg className='circle' viewBox='0 0 38 38'>
          <circle stroke='' fill='transparent' cx='19' cy='19' r='18' strokeWidth='2'></circle>
          <circle stroke={color} fill='transparent' cx='19' cy='19' r='18' strokeWidth='2' strokeDasharray={`${this.props.rating / 5 * 100}, 160`} strokeLinecap='round' transform='rotate(-90 19 19)'></circle>
          <text textAnchor='middle' x='19' y='25' fill={color}>{this.props.rating}</text>
        </svg>
      </div>
    )
  }
}