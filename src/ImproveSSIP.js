import React from 'react';
import './ImproveSSIP.css';

import { SSIP, NUMBERS } from './constants';

const Ssip = (props) => {
  const ssipNumber = (props.number + 1 > SSIP[props.size].length)
    ? 10
    : SSIP[props.size][props.number];

  return (
    <div className='parent'>
      <img className='icon-ssip' src={'./SSIP.png'} alt='ssip'></img>
      <div className='icon-ssip-number'>
      {(ssipNumber).toString().split('').map(e => (
        <img className='ssip-digit' key={e} src={NUMBERS[parseInt(e)]} alt={e}></img>
      ))}
      </div>
    </div>
  );
}

export default Ssip;
