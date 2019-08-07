import React from 'react';

import './App.css';

import Search from './Search';
import SearchResult from './SearchResult';
import ShipStatus from './ShipStatus';
import ImproveInfo from './ImproveInfo';
import ImproveStatus from './ImproveStatus';
import Skills from './Skills';
import Material from './Material';
import Grade from './Grade';
import Improve from './Improve';

import Footer from './Footer';

import { Store } from './Store';
import { RECALCULATE_ALL } from './constants';

const App = () => {
  const { dispatch } = React.useContext(Store);

  React.useEffect(() => dispatch({type: RECALCULATE_ALL}), [dispatch]);

  return (
    <div className='App'>
      <Search></Search>
      <SearchResult></SearchResult>
      <ShipStatus></ShipStatus>
      <ImproveInfo></ImproveInfo>
      <ImproveStatus></ImproveStatus>
      <Material></Material>
      <Skills></Skills>
      <Grade></Grade>
      <Improve></Improve>
      <Footer></Footer>
    </div>
  );
}

export default App;
