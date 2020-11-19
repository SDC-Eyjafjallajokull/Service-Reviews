import React from 'react'


const MainCircle = (props) => {

  var color = 'green';
    if (props.rating < 50) {
      color = 'orange';
    }
  return  (

    <div className='main-circle'>
      <svg className='circle' viewBox='0 0 38 38'>
          <circle stroke='' fill='transparent' cx='19' cy='19' r='18' strokeWidth='2'></circle>
          <circle stroke={color} fill='transparent' cx='19' cy='19' r='18' strokeWidth='2' strokeDasharray={`${props.rating}, 160`} strokeLinecap='round' transform='rotate(-90 19 19)'></circle>
          <text textAnchor='middle' x='19' y='25' fill={color}>{props.rating}</text>
        </svg>
        <text>{props.rating}% would recommend</text>
        <text>{props.recommendations} recommendations</text>
    </div>
  )
}

export default MainCircle;