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
          window.history.replaceState({}, null, `?state=${JSON.stringify(state)}`);
          dispatch({type: STATE_EXPORT});
        }}
      >{MENU_TXT_EXPORT_BUTTON}</button>
    </div>
  )
}

export default ExportState;
