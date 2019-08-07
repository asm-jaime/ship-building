import React from 'react';
import './Improve.css';

import ImproveStats from './ImproveStats';
import OnePart from './OnePart';

import { Store } from './Store';

import sails from './resSails';
import armaments from './resArmaments';
import gunports from './resGunports';
import panels from './resPanels';

import {
  SHIP_PART_EMPTY,
  IMPROVE_ADD,
} from './constants';

const Improve = () => {
  const { dispatch } = React.useContext(Store);
  const [sail, setSail] = React.useState(SHIP_PART_EMPTY);
  const [gunport, setGunport] = React.useState(SHIP_PART_EMPTY);
  const [armament_1, setArmament_1] = React.useState(SHIP_PART_EMPTY);
  const [armament_2, setArmament_2] = React.useState(SHIP_PART_EMPTY);

  const [status, setStatus] = React.useState([0,0,0,0]);

  const joinedRes = {...armaments, ...panels};

  return (
    <div className='improve'>
    <div className='improve-block'>
    <div className='selected-parts'>
      <OnePart name='sails' status={status[0]}
      show={() => setStatus(elem => elem[0] ? [0,0,0,0] : [1,0,0,0])}
      set={setSail} resource={sails} part={sail}/>
      <OnePart name='gunport' status={status[1]}
      show={() => setStatus(elem => elem[1] ? [0,0,0,0] : [0,1,0,0])}
      set={setGunport} resource={gunports} part={gunport}/>
      <OnePart name='armament' status={status[2]}
      show={() => setStatus(elem => elem[2] ? [0,0,0,0] : [0,0,1,0])}
      set={setArmament_1} resource={joinedRes} part={armament_1}/>
      <OnePart name='armament' status={status[3]}
      show={() => setStatus(elem => elem[3] ? [0,0,0,0] : [0,0,0,1])}
      set={setArmament_2} resource={joinedRes} part={armament_2}/>
    </div>
    <ImproveStats step={
      { active: true, sail, gunport, armament_1, armament_2 }
    }/>
    </div>
      <button onClick={()=>dispatch({
        type: IMPROVE_ADD,
        payload: {active: true, sail, gunport, armament_1, armament_2}
      })}>set</button>
    </div>
  )
}

export default Improve;
