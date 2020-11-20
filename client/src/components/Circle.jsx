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
    var stroke = 0;
    if (this.props.rating < 3) {
      color = 'orange'
    }
    if (value === 5) {
      stroke = '120, 160'
    } else if (value >= 4 && value < 5) {
      stroke = '80, 160'
    } else if  (value >= 3 && value < 4) {
      stroke = '60, 160';
    } else if (value >= 2 && value < 3) {
      stroke = '40, 160';
    } else if (value >= 1 && value < 2) {
      stroke = '20, 160';
    } else if (value === 0) {
      stroke = '0, 160'
    } else {
      stroke = `${(this.props.rating * 10) * 2}, 160`;
    }


    return (
      <div>
        <svg className='circle' viewBox='0 0 38 38'>
          <circle stroke='' fill='transparent' cx='19' cy='19' r='18' strokeWidth='2'></circle>
          <circle stroke={color} fill='transparent' cx='19' cy='19' r='18' strokeWidth='2' strokeDasharray={stroke} strokeLinecap='round' transform='rotate(-90 19 19)'></circle>
          <text textAnchor='middle' x='19' y='25' fill={color}>{this.props.rating}</text>
        </svg>
      </div>
    )
  }
}