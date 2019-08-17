import React from 'react';
import './Search.css';

import { Store } from './Store';

import resShips from './resShips';
import { find_ships } from './StoreResolve';

import {
  LVL_MIN,
  LVL_MAX,
  SEARCH_SET,
  SEARCH_STR_PLACEHOLDER,
  SOUND_CLICK,
} from './constants';

const BoxLvl = (props) => (<div className='box-lvl'>
    <div className='box-lvl-label'>{props.name}</div>
    <input className='box-lvl-number' type='number'
      value={props.from} onChange={props.handleFrom}
      min={LVL_MIN} max={LVL_MAX} />
    <input className='box-lvl-number' type='number'
      value={props.to} onChange={props.handleTo}
      min={LVL_MIN} max={LVL_MAX} />
  </div>
);

const BoxData = (props) => (<div className='box-data'>
  <div className='box-label'>{props.name}</div>
    <input className='box-checking' type='checkbox' checked={props.data}
      value={props.data} onChange={props.handle}
    />
  </div>
);

const Search = () => {
  const { dispatch } = React.useContext(Store);

  const [lvlAdvent, setLvlAdvent] = React.useState({from: LVL_MIN, to: LVL_MAX});
  const [lvlTrade, setLvlTrade] = React.useState({from: LVL_MIN, to: LVL_MAX});
  const [lvlBattle, setLvlBattle] = React.useState({from: LVL_MIN, to: LVL_MAX});

  const [sail, setSail] = React.useState(true);
  const [row, setRow] = React.useState(true);
  const [steam, setSteam] = React.useState(true);

  const [nc, setNc] = React.useState(false);

  const [light, setLight] = React.useState(true);
  const [standard, setStandard] = React.useState(true);
  const [heavy, setHeavy] = React.useState(true);

  const [adventure, setAdventure] = React.useState(true);
  const [trade, setTrade] = React.useState(true);
  const [battle, setBattle] = React.useState(true);


  const [searchStr, setSearchStr] = React.useState('');

  const handleAdvFrom = (event) => {
    const value = event.target.value;
    setLvlAdvent(prev => ({ from: value, to: prev.to }));
  }
  const handleAdvTo = (event) => {
    const value = event.target.value;
    setLvlAdvent(prev => ({ from: prev.from, to: value }));
  }
  const handleTrdFrom = (event) => {
    const value = event.target.value;
    setLvlTrade(prev => ({ from: value, to: prev.to }));
  }
  const handleTrdTo = (event) => {
    const value = event.target.value;
    setLvlTrade(prev => ({ from: prev.from, to: value }));
  }
  const handleBtlFrom = (event) => {
    const value = event.target.value;
    setLvlBattle(prev => ({ from: value, to: prev.to }));
  }
  const handleBtlTo = (event) => {
    const value = event.target.value;
    setLvlBattle(prev => ({ from: prev.from, to: value }));
  }

  const handleSearchStr = (event) => {
    const value = event.target.value;
    setSearchStr(() => value);
  }
  const searchShips = () => {
    const req = {
      lvlAdvent, lvlTrade, lvlBattle,
      row, steam, sail,
      light, standard, heavy,
      adventure, trade, battle,
      nc, searchStr,
    };
    dispatch({type: SEARCH_SET, payload: find_ships(resShips, req)});
    SOUND_CLICK.play();
  }

  return <div className='search'>
    <div className='component-title'>Search a ship</div>
    <div className='field-section'>
      <fieldset className='boxes'> <legend>level gap</legend>
        <BoxLvl name='advent' from={lvlAdvent.from} to={lvlAdvent.to}
          handleFrom={handleAdvFrom} handleTo={handleAdvTo} />
        <BoxLvl name='trade' from={lvlTrade.from} to={lvlTrade.to}
          handleFrom={handleTrdFrom} handleTo={handleTrdTo} />
        <BoxLvl name='battle' from={lvlBattle.from} to={lvlBattle.to}
          handleFrom={handleBtlFrom} handleTo={handleBtlTo} />
      </fieldset>
      <fieldset className='boxes'> <legend>purpose</legend>
        <BoxData name='advent'
          data={adventure} handle={() => setAdventure(e => !e)}/>
        <BoxData name='trade'
          data={trade} handle={() => setTrade(e => !e)}/>
        <BoxData name='battle'
          data={battle} handle={() => setBattle(e => !e)}/>
      </fieldset>
    </div>
    <div className='field-section'>
      <fieldset className='boxes'> <legend>size</legend>
        <BoxData name='light'
          data={light} handle={() => setLight(e => !e)}/>
        <BoxData name='standard'
          data={standard} handle={() => setStandard(e => !e)}/>
        <BoxData name='heavy'
          data={heavy} handle={() => setHeavy(e => !e)}/>
      </fieldset>
      <fieldset className='boxes'> <legend>engine</legend>
        <BoxData name='sail'
          data={sail} handle={() => setSail(e => !e)}/>
        <BoxData name='row'
          data={row} handle={() => setRow(e => !e)}/>
        <BoxData name='steam'
          data={steam} handle={() => setSteam(e => !e)}/>
      </fieldset>
      <fieldset className='boxes'>
        <legend>nc</legend>
        <BoxData name='nc' data={nc} handle={() => setNc(e => !e)}/>
      </fieldset>
    </div>
    <fieldset className='boxes'>
      <legend>ship/skill</legend>
      <input className='search-str' type='text' placeholder={SEARCH_STR_PLACEHOLDER}
        value={searchStr} onChange={handleSearchStr} />
    </fieldset>
    <button className='search-button' onClick={searchShips}>search</button>
  </div>;
};

export default Search;
