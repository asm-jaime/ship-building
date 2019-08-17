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
import { RECALCULATE_ALL } from './constants';

const App = () => {
  const { dispatch } = React.useContext(Store);

  React.useEffect(() => dispatch({type: RECALCULATE_ALL}), [dispatch]);

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
