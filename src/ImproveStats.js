import React from 'react';
import './ImproveStats.css';

import { get_iranges } from './StoreResolve';

import {
  IMPROVEABLE_PROPERTIES,
  SHIP_STAT_ICONS_IMP,
  SHIP_STAT_NAMES
} from './constants';

const ImproveStats = (props) => {
  const stats = get_iranges([props.step]);
  return <div className='improve-stats'>{
    IMPROVEABLE_PROPERTIES.map((p, i) => {
      if(stats[i][0] !== 0 || stats[i][1] !== 0) {
        return <div key={i} className='stat'>
          <img className='icon-stat' src={SHIP_STAT_ICONS_IMP[p]} alt={i}/>
          {stats[i][0]}~{stats[i][1]}, {SHIP_STAT_NAMES[p]}
        </div>;
      } else {
        return <div key={i}/>;
      }
    })
  }</div>;
};

export default ImproveStats;
