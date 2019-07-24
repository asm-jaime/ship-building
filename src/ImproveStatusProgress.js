import React from 'react';
import './ImproveStatusProgress.css';

import { get_improve } from './StoreResolve.js';

import { IMPROVE_POSITIVE, IMPROVE_NEGATIVE } from './constants'

const ImproveProgress = (props) => {
  const getImprove = () => (
    Math.abs(get_improve(props.res.improve, props.res.improve_limit.current))
  );

  const getSignum = (num) => (['', '+', '-'][
    0*~~(num === 0) + 1*~~(num > 0) + 2*~~(num < 0)
  ]);

  const getProgress = () => {
    const res = props.res;
    const improve = getImprove();
    const scale = ({
      true: 1,
      false: res.improve_limit.current
    })[res.improve_limit.current === 0];

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
        <img className='icon' src={`./i_${props.name}.png`} alt={props.name}></img>
        <div>{getTitleName(props.name)}</div>
      </div>
      <div className='improve-number-place'>
      <div className='improve-status-number'>
        {props.res.result - getImprove()}
      </div>
      (<div className='improve-number'>
        {getSignum(props.res.improve)}{getImprove()}
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
