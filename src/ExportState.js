import React from 'react';
import './ExportState.css';

import { Store } from './Store';
import {
  STATE_EXPORT,
  MENU_TXT_EXPORT_BUTTON,
} from './constants.js';

const ExportState = () => {
  const { state, dispatch } = React.useContext(Store);
  return (
    <div className='export-state'>
      <button className='button-export'
        onClick={() => {
          const url = new URL(window.location.href);
          url.searchParams.set('state', JSON.stringify(
            {ship: state.ship, improvements: state.improvements, grades: state.grades}
          ));
          window.history.replaceState({}, null, url);
          dispatch({type: STATE_EXPORT});
        }}
      ><div>{MENU_TXT_EXPORT_BUTTON}</div>
      <img className='icon-stat' src='./i_save_state.png' alt='save_state'></img>
      </button>
    </div>
  )
}

export default ExportState;
