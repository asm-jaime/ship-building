import React from 'react';
import './ComponentTitle.css';

import {
  IMG_TITLE_LEFT,
  IMG_TITLE_MIDDLE,
  IMG_TITLE_RIGHT,
} from './constants';

const ComponentTitle = (props) => {
  return <div className='component-title'>
    <img className='edge-img' src={IMG_TITLE_LEFT} alt={IMG_TITLE_LEFT}/>
    <div className='middle'>
      <img className='middle-img' src={IMG_TITLE_MIDDLE} alt={IMG_TITLE_MIDDLE}/>
      <div className='middle-text'>{props.name}</div>
    </div>
    <img className='edge-img' src={IMG_TITLE_RIGHT} alt={IMG_TITLE_RIGHT}/>
  </div>;
}

export default ComponentTitle;
