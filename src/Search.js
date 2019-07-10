import React from 'react';
import './Search.css';

import { Store } from './Store';
import { LVL_MIN, LVL_MAX, SEARCH_SET } from './constants';

const findShips = (ships, req) => {
  return ships.filter(ship => (
    ship.name.toLowerCase().match(req.searchStr.toLowerCase()) &&
    ship.row === req.row
  ));
}

const LvlBox = (props) => {
  return (
    <div className="lvl-box">
      <div className="lvl-label">{props.name}</div>
      <input className="lvl-input" type="number"
        value={props.from} onChange={props.handleFrom}
        min={LVL_MIN} max={LVL_MAX}
      ></input>
      <input className="lvl-input" type="number"
        value={props.to} onChange={props.handleTo}
        min={LVL_MIN} max={LVL_MAX}
      ></input>
    </div>
  )
}

const TypeShipBox = (props) => {
  return (
    <div className="type-box">
      <div className="type-ship">
        <div className="type-label">{props.nameFirst}</div>
        <input className="type-input" type="checkbox"
          value={props.first} onChange={props.handleFirst}
        ></input>
      </div>
      <div className="type-ship">
        <div className="type-label">{props.nameSecond}</div>
        <input className="type-input" type="checkbox"
          value={props.second} onChange={props.handleSecond}
        ></input>
      </div>
      <div className="type-ship">
        <div className="type-label">{props.nameThird}</div>
        <input className="type-input" type="checkbox"
          value={props.third} onChange={props.handleThird}
        ></input>
      </div>
    </div>
  )
}

const Search = (props) => {
  const { dispatch } = React.useContext(Store);

  const [lvlAdvent, setLvlAdvent] = React.useState({from: LVL_MIN, to: LVL_MAX});
  const [lvlTrade, setLvlTrade] = React.useState({from: LVL_MIN, to: LVL_MAX});
  const [lvlBattle, setLvlBattle] = React.useState({from: LVL_MIN, to: LVL_MAX});

  const [sails, setSails] = React.useState(false);
  const [row, setRow] = React.useState(false);
  const [steam, setSteam] = React.useState(false);

  const [light, setLight] = React.useState(false);
  const [standard, setStandard] = React.useState(false);
  const [heavy, setHeavy] = React.useState(false);

  const [adventure, setAdventure] = React.useState(false);
  const [trade, setTrade] = React.useState(false);
  const [battle, setBattle] = React.useState(false);

  const [nc, setNc] = React.useState(false);

  const [searchStr, setSearchStr] = React.useState("");

  React.useEffect(() => {
    /*
    fetch('./res.json')
      .then(res => res.json())
      .then(data => console.log(data));
    */
    //console.log('search');
    //console.log(light);
  });
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
      sails, row, steam,
      light, standard, heavy,
      adventure, trade, battle,
      nc, searchStr,
    };
    fetch('./resource.json')
      .then(res => res.json())
      .then(data => data.ships)
      .then(ships => findShips(ships, req))
      .then(res => dispatch({type: SEARCH_SET, payload: res}))
      .catch(console.log);
  }

  return (
    <div className="search">
      <div className="component-title">Search a ship</div>
      <div className="horizontal">
      <div>
        <LvlBox name="lvl adv:"
          from={lvlAdvent.from} to={lvlAdvent.to}
          handleFrom={handleAdvFrom} handleTo={handleAdvTo}
        ></LvlBox>
        <LvlBox name="lvl trd:"
          from={lvlTrade.from} to={lvlTrade.to}
          handleFrom={handleTrdFrom} handleTo={handleTrdTo}
        ></LvlBox>
        <LvlBox name="lvl btl:"
          from={lvlBattle.from} to={lvlBattle.to}
          handleFrom={handleBtlFrom} handleTo={handleBtlTo}
        ></LvlBox>
      </div>
      <TypeShipBox
        nameFirst="light:" first={light}
        handleFirst={() => setLight(elem => (!elem))}
        nameSecond="standard:" second={standard}
        handleSecond={() => setStandard(elem => (!elem))}
        nameThird="heavy:" third={heavy}
        handleThird={() => setHeavy(elem => (!elem))}
      ></TypeShipBox>
      </div>
      <div className="horizontal">
      <TypeShipBox
        nameFirst="sails:" first={sails}
        handleFirst={() => setSails(elem => (!elem))}
        nameSecond="row:" second={row}
        handleSecond={() => setRow(elem => (!elem))}
        nameThird="steam:" third={steam}
        handleThird={() => setSteam(elem => (!elem))}
      ></TypeShipBox>
      <TypeShipBox
        nameFirst="adventure:" first={adventure}
        handleFirst={() => setAdventure(elem => (!elem))}
        nameSecond="trade:" second={trade}
        handleSecond={() => setTrade(elem => (!elem))}
        nameThird="battle:" third={battle}
        handleThird={() => setBattle(elem => (!elem))}
      ></TypeShipBox>
      </div>
      <div className="type-ship">
        <div className="type-label">nc:</div>
        <input className="type-input" type="checkbox"
          value={nc} onChange={() => setNc(elem => (!elem))}
        ></input>
      </div>
      <div className="search-str-box">
        <div className="label-search-str">ship/skill:</div>
        <div> <input className="search-str" type="text"
          value={searchStr} onChange={handleSearchStr}
        ></input>
        </div>
      </div>
      <button className="search-button" onClick={searchShips}>search</button>
    </div>
  )
}

export default Search;
