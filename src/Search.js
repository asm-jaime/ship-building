import React from 'react';
import './Search.css';

import { Store } from './Store';

import resShips from './resShips';
import resSkills from './resSkills';
import { get_short_name } from './StoreResolve';

import {
  LVL_MIN,
  LVL_MAX,
  SEARCH_SET,
  SHIP_TYPE_ADVENTURE,
  SHIP_TYPE_TRADE,
  SHIP_TYPE_BATTLE,
  SHIP_SIZE_LIGHT,
  SHIP_SIZE_STANDARD,
  SHIP_SIZE_HEAVY,
} from './constants';

const findShips = (ships, req) => {
  const result = [];
  const keys = Object.keys(ships);

  for(let i = 0; i < keys.length; ++i) {
    if(ships[keys[i]]['levels']['advent'] < req.lvlAdvent.from ||
       ships[keys[i]]['levels']['advent'] > req.lvlAdvent.to) {
      continue;
    }
    if(ships[keys[i]]['levels']['trade'] < req.lvlTrade.from ||
       ships[keys[i]]['levels']['trade'] > req.lvlTrade.to) {
      continue;
    }
    if(ships[keys[i]]['levels']['battle'] < req.lvlBattle.from ||
       ships[keys[i]]['levels']['battle'] > req.lvlBattle.to) {
      continue;
    }

    if(ships[keys[i]]['purpose'] === SHIP_TYPE_ADVENTURE &&
       req.adventure === false) {
      continue;
    }
    if(ships[keys[i]]['purpose'] === SHIP_TYPE_TRADE &&
       req.trade === false) {
      continue;
    }
    if(ships[keys[i]]['purpose'] === SHIP_TYPE_BATTLE &&
       req.battle === false) {
      continue;
    }

    if(ships[keys[i]]['size'] === SHIP_SIZE_LIGHT &&
       req.light === false) {
      continue;
    }
    if(ships[keys[i]]['size'] === SHIP_SIZE_STANDARD &&
       req.standard === false) {
      continue;
    }
    if(ships[keys[i]]['size'] === SHIP_SIZE_HEAVY &&
       req.heavy === false) {
      continue;
    }


    if(ships[keys[i]]['row_power']['row'] === true &&
       req.row === false) {
      continue;
    }
    if(ships[keys[i]]['is_nc'] === true &&
       req.nc === false) {
      continue;
    }
    if(ships[keys[i]]['steam'] === true &&
       req.steam === false) {
      continue;
    }

    // filter any name/skill match, include acronyms
    const search = req.searchStr.toLowerCase();
    if(req.searchStr !== '' &&
      ships[keys[i]].name.toLowerCase().match(search) === null &&
      get_short_name(ships[keys[i]].name).match(search) === null &&
      ships[keys[i]].skills.available.find(skill => (
        resSkills[skill.id]['name'].toLowerCase().match(search) !== null
      )) === undefined &&
      ships[keys[i]].skills.available.find(skill => (
        get_short_name(resSkills[skill.id]['name']).match(search) !== null
      )) === undefined
    ) {
      continue;
    }

    result.push(ships[keys[i]]);
  }
  return result;
}

const LvlBox = (props) => (<div className='lvl-box'>
    <div className='lvl-label'>{props.name}</div>
    <input className='lvl-input' type='number'
      value={props.from} onChange={props.handleFrom}
      min={LVL_MIN} max={LVL_MAX}
    />
    <input className='lvl-input' type='number'
      value={props.to} onChange={props.handleTo}
      min={LVL_MIN} max={LVL_MAX}
    />
  </div>
);

const TypeShipBox = (props) => (<div className='type-box'>
    <div className='type-ship'>
      <div className='type-label'>{props.nameFirst}</div>
      <input className='type-input' type='checkbox' checked={props.first}
        value={props.first} onChange={props.handleFirst}
      />
    </div>
    <div className='type-ship'>
      <div className='type-label'>{props.nameSecond}</div>
      <input className='type-input' type='checkbox' checked={props.second}
        value={props.second} onChange={props.handleSecond}
      />
    </div>
    <div className='type-ship'>
      <div className='type-label'>{props.nameThird}</div>
      <input className='type-input' type='checkbox' checked={props.third}
        value={props.third} onChange={props.handleThird}
      />
    </div>
  </div>
);

const Search = () => {
  const { dispatch } = React.useContext(Store);

  const [lvlAdvent, setLvlAdvent] = React.useState({from: LVL_MIN, to: LVL_MAX});
  const [lvlTrade, setLvlTrade] = React.useState({from: LVL_MIN, to: LVL_MAX});
  const [lvlBattle, setLvlBattle] = React.useState({from: LVL_MIN, to: LVL_MAX});

  const [row, setRow] = React.useState(true);
  const [steam, setSteam] = React.useState(true);
  const [nc, setNc] = React.useState(true);

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
      row, steam,
      light, standard, heavy,
      adventure, trade, battle,
      nc, searchStr,
    };
    dispatch({type: SEARCH_SET, payload: findShips(resShips, req)});
  }

  return (
    <div className='search'>
      <div className='component-title'>Search a ship</div>
      <div className='horizontal'>
      <div>
        <LvlBox name='lvl adv:'
          from={lvlAdvent.from} to={lvlAdvent.to}
          handleFrom={handleAdvFrom} handleTo={handleAdvTo}
        ></LvlBox>
        <LvlBox name='lvl trd:'
          from={lvlTrade.from} to={lvlTrade.to}
          handleFrom={handleTrdFrom} handleTo={handleTrdTo}
        ></LvlBox>
        <LvlBox name='lvl btl:'
          from={lvlBattle.from} to={lvlBattle.to}
          handleFrom={handleBtlFrom} handleTo={handleBtlTo}
        ></LvlBox>
      </div>
      <TypeShipBox
        nameFirst='adventure:' first={adventure}
        handleFirst={() => setAdventure(elem => (!elem))}
        nameSecond='trade:' second={trade}
        handleSecond={() => setTrade(elem => (!elem))}
        nameThird='battle:' third={battle}
        handleThird={() => setBattle(elem => (!elem))}
      />
      </div>
      <div className='horizontal'>
      <TypeShipBox
        nameFirst='light:' first={light}
        handleFirst={() => setLight(elem => (!elem))}
        nameSecond='standard:' second={standard}
        handleSecond={() => setStandard(elem => (!elem))}
        nameThird='heavy:' third={heavy}
        handleThird={() => setHeavy(elem => (!elem))}
      />
      <TypeShipBox
        nameFirst='nc:' first={nc}
        handleFirst={() => setNc(elem => (!elem))}
        nameSecond='row:' second={row}
        handleSecond={() => setRow(elem => (!elem))}
        nameThird='steam:' third={steam}
        handleThird={() => setSteam(elem => (!elem))}
      />
      </div>
      <div className='search-str-box'>
        <div className='label-search-str'>ship/skill:</div>
        <div> <input className='search-str' type='text'
          value={searchStr} onChange={handleSearchStr}
        ></input>
        </div>
      </div>
      <button className='search-button' onClick={searchShips}>search</button>
    </div>
  )
};

export default Search;
