import React from 'react';
import './ImproveStatusProgress.css';

import {
  IMPROVE_POSITIVE,
  IMPROVE_NEGATIVE,
  SHIP_STAT_ICONS_IMP,
} from './constants'

import { get_base_ship_stat } from './StoreResolve';

const ImproveProgress = (props) => {
  const getSignum = (num) => (['', '+', '-'][
    0*~~(num === 0) + 1*~~(num > 0) + 2*~~(num < 0)
  ]);

  const getProgress = () => {
    const improve = Math.abs(props.res.result);
    const scale = props.res.improve_limit.current || 1;

    return `${parseInt(100*improve/scale)}%`;
  };

  const getTitleName = (name) => {
    return name.split('_').map(e => {
      const word = e.split('');
      const res = word[0].toUpperCase() + word.splice(1).join('');
      return res;
    }).join(' ');
  };

  const getColor = () => ([IMPROVE_NEGATIVE, IMPROVE_POSITIVE][
    ~~(props.res.improve < 0)
  ]);

  return (
    <div className='improve-status-progress'>
    <div className='improve-status-data'>
      <div className='improve-status-title'>
        <img className='icon-stat' alt={props.name}
          src={SHIP_STAT_ICONS_IMP[props.name]}
        />
        <div>{getTitleName(props.name)}</div>
      </div>
      <div className='improve-number-place'>
      <div className='improve-status-number'>
        {get_base_ship_stat[props.name](props.res)}
      </div>
      (<div className='improve-number'>
        {getSignum(props.res.result)}{Math.abs(props.res.result)}
      </div>)
      </div>
    </div>
    <div className='progress-ground'>
      <div className='progress-line' style={{
        background: getColor(),
        width: getProgress(),
      }}></div>
    </div>
    </div>
  );
};

export default ImproveProgress;
