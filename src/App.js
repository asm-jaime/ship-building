import React from 'react';

import './App.css';

import Search from './Search';
import SearchResult from './SearchResult';
import ShipStatus from './ShipStatus';
import ImproveInfo from './ImproveInfo';
import ImproveStatus from './ImproveStatus';
import Skill from './Skill';
import Material from './Material';
import Grade from './Grade';
import Improve from './Improve';

import Footer from './Footer';

const App = () => {
  React.useLayoutEffect(() => {
  }, []);

  return (
    <div className="App">
      <Search></Search>
      <SearchResult></SearchResult>
      <ShipStatus></ShipStatus>
      <ImproveInfo></ImproveInfo>
      <ImproveStatus></ImproveStatus>
      <Material></Material>
      <Skill></Skill>
      <Grade></Grade>
      <Improve></Improve>
      <Footer></Footer>
    </div>
  );
}

export default App;
