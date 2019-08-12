import React from 'react';
import './InfoRange.css';

import {
  SHIP_STAT_ICONS_UW2,
  SOUND_CLICK,
} from './constants';

const InfoRange = (props) => {
  return (
    <div className='info-performance-progress' title={props.name}>
      <div className='info-performance-state'>
      <img className='icon-range' alt={props.name}
      src={SHIP_STAT_ICONS_UW2[props.performance]}
      ></img> <span className='info-ship-number'>{props.result}</span>
      {props.ranges.map((num, i) =>
        <button className='range-button' key={i} onClick={() => {
          props.set(num);
          SOUND_CLICK.play();
          ;
        }}>{num}</button>)
      }
      </div> <div className='info-ship-range-progress'></div>
    </div>
  );
};

export default InfoRange;
