import React from 'react';

import './App.css';

import Search from './Search';
import SearchResult from './SearchResult';
import ShipBasicInfo from './ShipBasicInfo';
import ImproveInfo from './ImproveInfo';
import ImproveStatus from './ImproveStatus';
import GeneralSets from './GeneralSets';
import Grade from './Grade';
import Improve from './Improve';
import Info from './Info';

import { Store } from './Store';
import {
  RECALCULATE_ALL,
  STATE_IMPORT,
  MESSAGE_STATE_FAIL_IMPORT,
  MESSAGE_ADD
} from './constants';

const App = () => {
  const { dispatch } = React.useContext(Store);

  React.useEffect(() => {
    console.log(window.location.search);
    if(window.location.search !== '') {
      try {
        const stateValue = (new URLSearchParams(window.location.search)).get('state');
        const stateJson = JSON.parse(decodeURI(stateValue));
        dispatch({type: STATE_IMPORT, payload: stateJson});
      } catch(e) {
        dispatch({type: MESSAGE_ADD, payload: MESSAGE_STATE_FAIL_IMPORT});
      }
    }

    dispatch({type: RECALCULATE_ALL});
  }, [dispatch]);

  return (
    <div className='App'>
      <Search/>
      <SearchResult/>
      <ShipBasicInfo/>
      <ImproveInfo/>
      <ImproveStatus/>
      <GeneralSets/>
      <Grade/>
      <Improve/>
      <Info/>
    </div>
  );
}

export default App;
