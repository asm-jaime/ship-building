import React from 'react';
import './Panel.css';

import panels from './resPanels';

import OnePart from './OnePart';

import { Store } from './Store';
import { get_available_panels } from './StoreResolve';

import {
  BEECH_PANELING,
  PANEL_STEP_SET,
  PANEL_SET,
  SHIP_PART_EMPTY,
  SHIP_PART_EMPTY_NOTE,
  AGREE_SOUND,
  SOUND_HOVER,
} from './constants';

const Panel = (props) => {
  const { state, dispatch } = React.useContext(Store);
  const [status, setStatus] = React.useState(0);

  const getPanelName = () => {
    if(state.panel_step === SHIP_PART_EMPTY) {
      return SHIP_PART_EMPTY_NOTE;
    }
    return panels[state.panel_step]['name'];
  };

  const dataPanels = get_available_panels(state.ship, panels);

  return (
    <div className='panel'>
      <div>{getPanelName()}</div>
      <div className='panel-right-block'>
      <OnePart name='panel' status={status}
        show={() => setStatus(status => status ? 0 : 1)}
        set={panel => dispatch({type: PANEL_STEP_SET, payload: panel})}
        resource={panels} data={dataPanels} part={state.panel_step}/>
      <button className='panel-set-button button-agree'
      onMouseEnter={() => SOUND_HOVER.play()}
      onClick={() => {
        if(state.panel_step === SHIP_PART_EMPTY) {
          dispatch({ type: PANEL_SET, payload: panels[BEECH_PANELING] });
        } else {
          dispatch({ type: PANEL_SET, payload: panels[state.panel_step] });
        }
        AGREE_SOUND.play();
      }}></button>
      </div>
    </div>
  )
}
export default Panel;
