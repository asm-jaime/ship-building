import React from 'react';
import './Custom.css';

import {
  SHIP_STAT_ICONS_IMP,
  SHIP_STAT_NAMES,
} from './constants'

const Custom = (props) => {
  return <div className='custom'>
      <div className='custom-left-group'>
        <img className='icon-stat'
          src={SHIP_STAT_ICONS_IMP[props.name]} alt={props.name}/>
        <div>{SHIP_STAT_NAMES[props.name]}</div>
      </div>
      <div>
      <input className='custom-input' type='number'
        min={-2*props.resource.improve_limit.current}
        max={2*props.resource.improve_limit.current}
        value={props.resource.custom}
        onChange={props.set}
      />
      </div>
    </div>;
};

export default Custom;
