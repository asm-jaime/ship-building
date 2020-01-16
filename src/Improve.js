import React from 'react';
import './Improve.css';

import ImproveStats from './ImproveStats';
import OnePart from './OnePart';
import ComponentTitle from './ComponentTitle';

import { Store } from './Store';
import {
  get_available_armaments,
  get_available_sails,
  get_available_gunports,
} from './StoreResolve';

import sails from './resSails';
import armaments from './resArmaments';
import gunports from './resGunports';
import panels from './resPanels';

import {
  IMPROVE_STEP_SET_SAIL,
  IMPROVE_STEP_SET_GUNPORT,
  IMPROVE_STEP_SET_ARMAMENT_1,
  IMPROVE_STEP_SET_ARMAMENT_2,
  IMPROVE_ADD,
  AGREE_SOUND,
  SOUND_HOVER,
} from './constants';

const allArmaments = {...armaments, ...panels};

const Improve = () => {
  const { state, dispatch } = React.useContext(Store);

  const [status, setStatus] = React.useState([0,0,0,0]);

  const dataArmaments = get_available_armaments(state.ship, allArmaments);
  const dataSails     = get_available_sails(state.ship, sails);
  const dataGunports  = get_available_gunports(state.ship, gunports);

  return <div className='improve'>
    <ComponentTitle name='add improvement'/>
    <div className='improve-section'>
      <div className='selected-parts'>
        <OnePart name='sails' status={status[0]}
          resource={sails} data={dataSails}
          show={() => setStatus(elem => elem[0] ? [0,0,0,0] : [1,0,0,0])}
          set={sail => dispatch({type: IMPROVE_STEP_SET_SAIL, payload: sail})}
          part={state.improve_step.sail}/>
        <OnePart name='gunport' status={status[1]}
          resource={gunports} data={dataGunports}
          show={() => setStatus(elem => elem[1] ? [0,0,0,0] : [0,1,0,0])}
          set={gunport => dispatch({
            type: IMPROVE_STEP_SET_GUNPORT, payload: gunport
          })}
          part={state.improve_step.gunport}/>
        <OnePart name='armament' status={status[2]}
          resource={allArmaments} data={dataArmaments}
          show={() => setStatus(elem => elem[2] ? [0,0,0,0] : [0,0,1,0])}
          set={armament_1 => dispatch({
            type: IMPROVE_STEP_SET_ARMAMENT_1, payload: armament_1
          })}
          part={state.improve_step.armament_1}/>
        <OnePart name='armament' status={status[3]}
          resource={allArmaments} data={dataArmaments}
          show={() => setStatus(elem => elem[3] ? [0,0,0,0] : [0,0,0,1])}
          set={armament_2 => dispatch({
            type: IMPROVE_STEP_SET_ARMAMENT_2, payload: armament_2
          })}
          part={state.improve_step.armament_2}/>
      </div>
      <button className='improve-add-button button-agree'
        onMouseEnter={() => SOUND_HOVER.play()}
        onClick={() => {
          dispatch({
            type: IMPROVE_ADD,
            payload: { active: true, ...state.improve_step }
          });
          AGREE_SOUND.play();
        }}>
      </button>
    </div>
    <ImproveStats step={
      { active: true, ...state.improve_step }
    }/>
  </div>;
}

export default Improve;
