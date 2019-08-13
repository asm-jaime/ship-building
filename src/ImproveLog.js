import React from 'react';
import './ImproveLog.css';

import Ssip from './ImproveSSIP';

import { Store } from './Store';
import { get_stat_string } from './StoreResolve';

import {
  IMPROVE_ACTIVE_TOGGLE,
  IMPROVE_DEL,
  DISAGREE_SOUND,
  SOUND_HOVER,
} from './constants';

import sails from './resSails';
import gunports from './resGunports';
import armaments from './resArmaments';
import panels from './resPanels';

const allArmaments = {...armaments, ...panels};

const ImproveLog = (props) => {
  const { dispatch } = React.useContext(Store);

  return <div className='improve-log'>
    {props.improvements.map((improve, num) => {
      return <div className='improve-step' key={num}>
        <div className='improve-step-number'>{num + 1}</div>
        <div className='improve-toggler'>
          <input className='improve-check' type='checkbox'
          value={improve.active} checked={improve.active}
          onChange={() => dispatch({type: IMPROVE_ACTIVE_TOGGLE, payload: num})}
          ></input>
        </div>
        <img className='icon-ship-part' alt={improve.sail}
          src={sails[improve.sail]['img']}
          title={`${sails[improve.sail]['name']} ${
            get_stat_string(sails[improve.sail]['stats_ranges'])
          }`}/>
        <img className='icon-ship-part' alt={improve.gunport}
          src={gunports[improve.gunport]['img']}
          title={`${gunports[improve.gunport]['name']} ${
            get_stat_string(gunports[improve.gunport]['stats_ranges'])
          }`}/>
        <img className='icon-ship-part' alt={improve.armament_1}
          src={allArmaments[improve.armament_1]['img']}
          title={`${allArmaments[improve.armament_1]['name']} ${
            get_stat_string(allArmaments[improve.armament_1]['stats_ranges'])
          }`}/>
        <img className='icon-ship-part' alt={improve.armament_2}
          src={allArmaments[improve.armament_2]['img']}
          title={`${allArmaments[improve.armament_2]['name']} ${
            get_stat_string(allArmaments[improve.armament_2]['stats_ranges'])
          }`}/>
        <Ssip size={props.size} number={num}/>
        <button className='improve-delete-button button-disagree'
          onMouseEnter={() => SOUND_HOVER.play()}
          onClick={() => {
            dispatch({type: IMPROVE_DEL, payload: num});
            DISAGREE_SOUND.play();
          }}
          title='remove improvement'>
        </button>
        </div>;
    })}
    </div>;
}
// <img className='improve-delete-icon' src={buttonImg} alt='del'/>

export default ImproveLog;
