import React from 'react';
import './ImproveStatusProgress.css';

import {
  IMPROVE_POSITIVE,
  IMPROVE_NEGATIVE,
  SHIP_STAT_ICONS_IMP,
  SHIP_STAT_TITLES,
} from './constants'

import { get_base_ship_stat, get_max_ship_bonus } from './StoreResolve';

const ImproveProgress = (props) => {

  const get_signum = (num) => {
    if(num > 0) return '+';
    if(num < 0) return '-';
    if(num === 0) return '';
  };

  const get_progress = (result, limit) => (
    `${parseInt(100*Math.abs(result)/(limit || 1))}%`
  );

  const get_color = (num) => {
    if(num < 0) {
      return IMPROVE_NEGATIVE;
    } else {
      return IMPROVE_POSITIVE;
    }
  };

  return (
    <div className='improve-status-progress' title={`${
        get_max_ship_bonus[props.name](props.res)
      }/${
        props.res.improve_limit.current
      }`}>
    <div className='improve-status-data'>
      <div className='improve-status-title'>
        <img className='icon-stat' alt={props.name}
          src={SHIP_STAT_ICONS_IMP[props.name]}
        />
        <div>{SHIP_STAT_TITLES[props.name]}</div>
      </div>
      <div className='improve-number-place'>
      <div className='improve-status-number'>
        {get_base_ship_stat[props.name](props.res)}
      </div>
      (<div className='improve-number'>
        {get_signum(props.res.result)}{Math.abs(props.res.result)}
      </div>)
      </div>
    </div>
    <div className='progress-ground'>
      <div className='progress-line' style={{
        background: get_color(props.res.result),
        width: get_progress(props.res.result, props.res.improve_limit.current),
      }}></div>
    </div>
    </div>
  );
};

export default ImproveProgress;
