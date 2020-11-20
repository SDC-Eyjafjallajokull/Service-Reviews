import React from 'react';
import { Checkmark } from 'react-checkmark';
import { FcCancel } from 'react-icons/fc';


const Recommended = (props) => {

  if (props.isRecommended) {
    return (
      <div className='recommend'>
        <Checkmark size='small' color='green'/>
        <span className='recommend-text'>Would Recommended</span>
      </div>
    );
  } else {
    return (
      <div className='recommend'>
        <FcCancel className='redCircle'/>
        <span className='recommend-text'>Would Not Recommended</span>
      </div>
    )
  }

}


export default Recommended;