import React from 'react';
import Circle from './Circle.jsx';


export default class Overview extends React.Component {
  constructor() {
    super();
  }



  render() {
    return (
      <div className="Overview">
        <h1 className='overview-header'>Guest Ratings {'&'} Reviews</h1>
      </div>
    )
  }
}