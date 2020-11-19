import React from 'react'



export default function ProgressBar (props) {
  return (
    <div className='progress-bar'>
      <span className="progress-bar-star">{props.star} stars</span>
      <progress value={props.percent} max='100'></progress>
      <span className='progress-bar-percent'>{props.percent}%</span>
    </div>
  )
}