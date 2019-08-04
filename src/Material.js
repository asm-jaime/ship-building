import React from 'react';
import './Material.css';

import panels from './resPanels';

import { Store } from './Store';
import { PANEL_SET, PANEL_EMPTY } from './constants';

const Material = (props) => {
  const { dispatch } = React.useContext(Store);

  const [panel, setPanel] = React.useState(PANEL_EMPTY);
  const [showPanels, setShowPanels] = React.useState('none');

  const toggler = { 'grid': 'none', 'none': 'grid' };
  const statusButton = { 'grid': 'hide', 'none': 'show' };

  const panelName = () => {
    if(panel === PANEL_EMPTY) {
      return 'Empty Panel';
    } else {
      return panels[panel]['name'];
    }
  };
  console.log(Object.keys(panels));

  return (
    <div className='material'>

      <div className='panel'>
        <div className='panel-left'>
          <button className='panel-show-button'
          onClick={() => setShowPanels(
            showPanels => toggler[showPanels]
          )}>{statusButton[showPanels]}</button>
          <div className='panel-name'>{panelName()}</div>
        </div>
        <div className='panel-right'>
          <div className='panel-frame'>
            <img className='icon-panel' src={
              panel === PANEL_EMPTY ? `./${PANEL_EMPTY}.png` : panels[panel]['img']
            } alt={panel}/>
          </div>
          <button onClick={() => {
            dispatch({ type: PANEL_SET, payload: panels[panel] });
          }}>set</button>
        </div>
      </div>

      <div className='panel-select' style={{display: showPanels}}>
        {Object.keys(panels).map(key => (
          <img src={panels[key]['img']} className='icon-select-panel'
            key={key} alt={key} onClick={
            () => {
              setPanel(key);
              setShowPanels(showPanels => toggler[showPanels]);
            }
          }></img>))
        }
      </div>
    </div>
  )
}

export default Material;
