import React from 'react';
import { Store } from './Store';

import { dataLoadDefault } from './actions';

import './App.css';

import Search from './Search';
import SearchResult from './SearchResult';
import ShipStatus from './ShipStatus';
import ImproveStatus from './ImproveStatus';
import OptionalSkill from './OptionalSkill';
import OriginalSkill from './OriginalSkill';
import Grade from './Grade';
import Improve from './Improve';

import Footer from './Footer';

const App = () => {
  const { state, dispatch } = React.useContext(Store);
  React.useEffect(() => {
    dataLoadDefault(dispatch);
    console.log(state);
  });

  return (
    <div className="App">
      <Search></Search>
      <SearchResult></SearchResult>
      <ShipStatus></ShipStatus>
      <ImproveStatus></ImproveStatus>
      <OptionalSkill></OptionalSkill>
      <OriginalSkill></OriginalSkill>
      <Grade></Grade>
      <Improve></Improve>
      <Footer></Footer>
    </div>
  );
}

export default App;
