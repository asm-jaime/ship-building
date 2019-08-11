import React from 'react';
import './Improve.css';

import ImproveStats from './ImproveStats';
import OnePart from './OnePart';

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
  SHIP_PART_EMPTY,
  IMPROVE_ADD,
  AGREE_SOUND,
  SOUND_HOVER,
} from './constants';

const allArmaments = {...armaments, ...panels};

const Improve = () => {
  const { state, dispatch } = React.useContext(Store);
  const [sail, setSail] = React.useState(SHIP_PART_EMPTY);
  const [gunport, setGunport] = React.useState(SHIP_PART_EMPTY);
  const [armament_1, setArmament_1] = React.useState(SHIP_PART_EMPTY);
  const [armament_2, setArmament_2] = React.useState(SHIP_PART_EMPTY);

  const [status, setStatus] = React.useState([0,0,0,0]);

  const dataArmaments = get_available_armaments(state.ship, allArmaments);
  const dataSails     = get_available_sails(state.ship, sails);
  const dataGunports  = get_available_gunports(state.ship, gunports);

  return (
    <div className='improve'>
    <div className='improve-block'>
    <div className='selected-parts'>
      <OnePart name='sails' status={status[0]}
        resource={sails} data={dataSails}
        show={() => setStatus(elem => elem[0] ? [0,0,0,0] : [1,0,0,0])}
        set={setSail} part={sail}/>
      <OnePart name='gunport' status={status[1]}
        resource={gunports} data={dataGunports}
        show={() => setStatus(elem => elem[1] ? [0,0,0,0] : [0,1,0,0])}
        set={setGunport} part={gunport}/>
      <OnePart name='armament' status={status[2]}
        resource={allArmaments} data={dataArmaments}
        show={() => setStatus(elem => elem[2] ? [0,0,0,0] : [0,0,1,0])}
        set={setArmament_1}  part={armament_1}/>
      <OnePart name='armament' status={status[3]}
        resource={allArmaments} data={dataArmaments}
        show={() => setStatus(elem => elem[3] ? [0,0,0,0] : [0,0,0,1])}
        set={setArmament_2} part={armament_2}/>
    </div>
    <ImproveStats step={
      { active: true, sail, gunport, armament_1, armament_2 }
    }/>
    </div>
      <button className='improve-add-button button-agree'
      onMouseEnter={() => SOUND_HOVER.play()}
      onClick={()=> {
        dispatch({
          type: IMPROVE_ADD,
          payload: {active: true, sail, gunport, armament_1, armament_2}
        });
        AGREE_SOUND.play();
      }}></button>
    </div>
  )
}

export default Improve;
