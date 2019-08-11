import React from 'react';
import './Panel.css';

import panels from './resPanels';

import OnePart from './OnePart';

import { Store } from './Store';
import { get_available_panels } from './StoreResolve';

import {
  BEECH_PANELING,
  PANEL_SET,
  SHIP_PART_EMPTY,
  SHIP_PART_EMPTY_NOTE,
  AGREE_SOUND,
  SOUND_HOVER,
} from './constants';

const Panel = (props) => {
  const { state, dispatch } = React.useContext(Store);
  const [panel, setPanel] = React.useState(SHIP_PART_EMPTY);
  const [status, setStatus] = React.useState(0);

  const getPanelName = () => {
    if(panel === SHIP_PART_EMPTY) {
      return SHIP_PART_EMPTY_NOTE;
    }
    return panels[panel]['name'];
  };

  const dataPanels = get_available_panels(state.ship, panels);

  return (
    <div className='panel'>
      <div>{getPanelName()}</div>
      <div className='panel-right-block'>
      <OnePart name='panel' status={status}
        show={() => setStatus(status => status ? 0 : 1)}
        set={setPanel} resource={panels} data={dataPanels} part={panel}/>
      <button className='panel-set-button button-agree'
      onMouseEnter={() => SOUND_HOVER.play()}
      onClick={() => {
        if(panel === SHIP_PART_EMPTY) {
          dispatch({ type: PANEL_SET, payload: panels[BEECH_PANELING] });
        } else {
          dispatch({ type: PANEL_SET, payload: panels[panel] });
        }
        AGREE_SOUND.play();
      }}></button>
      </div>
    </div>
  )
}
export default Panel;
