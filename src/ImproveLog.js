import React from 'react';
import './ImproveLog.css';

import { Store } from './Store';

import Sails from './resSails';
import Gunports from './resGunports';
import Armaments from './resArmaments';

import { SSIP, NUMBERS,
// IMPROVEABLE_PROPERTIES,
  IMPROVE_ACTIVE_TOGGLE,
  IMPROVE_DEL
} from './constants';

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

const ImproveLog = (props) => {
  const { dispatch } = React.useContext(Store);

  const empty = (name) => (
    <img className='icon-ship-part'
      src='ship_part_empty.png' alt='empty'
      title={name}
    ></img>
  );

  return (
    <div className='improve-log'>
    {props.improvements.map((improve, num) => {
      const sail = (improve.sail)
      ? (<img
          className='icon-ship-part' alt={improve.sail}
          src={Sails[improve.sail]['img']}
          title={Sails[improve.sail]['name']}
         />)
      : (empty('Sail'));
      const gunport = (improve.gunport)
      ? (<img
          className='icon-ship-part' alt={improve.gunport}
          src={Gunports[improve.gunport]['img']}
          title={Gunports[improve.gunport]['name']}
         />)
      : (empty('Gunport'));
      const armament_1 = (improve.armament_1)
      ? (<img
          className='icon-ship-part' alt={improve.armament_1}
          src={Armaments[improve.armament_1]['img']}
          title={Armaments[improve.armament_1]['name']}
         />)
      : (empty('Armament 1'));
      const armament_2 = (improve.armament_2)
      ? (<img
          className='icon-ship-part' alt={improve.armament_2}
          src={Armaments[improve.armament_2]['img']}
          title={Armaments[improve.armament_2]['name']}
         />)
      : (empty('Armament 2'));

      return (
        <div className='improve-step' key={num}>
          <div className='improve-step-number'>{num + 1}.</div>
          <div className='improve-toggler'>
          <input type='checkbox' value={improve.active} defaultChecked
            onClick={() => dispatch({type: IMPROVE_ACTIVE_TOGGLE, payload: num})}
          ></input>
          </div>
          {sail}
          {gunport}
          {armament_1}
          {armament_2}
          <Ssip size={props.size} number={num}/>
          <button className='improve-delete-button'
            onClick={() => dispatch({type: IMPROVE_DEL, payload: num})}
            title='remove improvement'>
            <img className='improve-delete-icon' src='./delete_improve_step.png'/>
          </button>
        </div>
      );
    })}
    </div>
  );
}

export default ImproveLog;
