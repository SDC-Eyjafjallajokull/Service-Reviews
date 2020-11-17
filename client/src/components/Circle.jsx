import React from 'react';




export default class Circle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }

  }





  render() {
    var percentValue = '';
    var color = 'green';
    if (this.props.rating === 5) {
      percentValue = '120, 160'
    } else if (this.props.rating === 4) {
      percentValue = '100, 160';
    } else if (this.props.rating === 3) {
      percentValue = '67, 160';
    } else if (this.props.rating === 2) {
      percentValue = '45, 160';
      color = 'orange'
    } else if (this.props.rating === 1) {
      percentValue = '22, 160';
      color = 'orange'
    } else if (this.props.rating === 0) {
      percentValue = '0, 0';
      color = 'gray';
    }
    return (
      <div>
        <svg className='circle' viewBox='0 0 38 38'>
          <circle stroke='' fill='transparent' cx='19' cy='19' r='18' strokeWidth='2'></circle>
          <circle stroke={color} fill='transparent' cx='19' cy='19' r='18' strokeWidth='2' strokeDasharray={percentValue} strokeLinecap='round' transform='rotate(-90 19 19)'></circle>
          <text textAnchor='middle' x='19' y='25' fill={color}>{this.props.rating}</text>
        </svg>
      </div>
    )
  }
}