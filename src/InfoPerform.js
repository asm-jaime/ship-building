import React from 'react';
import './InfoPerform.css';

import {
  SHIP_STAT_ICONS_UW2,
} from './constants';

const InfoPerform = (props) => {
  return (
    <div className='info-performance-state' title={props.name}>
      <img className='icon-stat' alt={props.name}
        src={SHIP_STAT_ICONS_UW2[props.performance]}
      />
      <span className='info-ship-number'>{props.result}</span>
    </div>
  );
};

export default InfoPerform;
