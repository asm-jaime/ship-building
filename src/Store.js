import React from 'react';
import {
  LVL_MIN,
  LVL_MAX,
  LVL_ADVENTURE_SET,
  SEARCH_SET,
  SHIP_SET,
} from './constants';

export const Store = React.createContext();

const initialState = {
  ship: {
  "id": "00000192",
  "href": "http://uwodbmirror.ivyro.net/eg/main.php?id=50000192",
  "name": "First Class Vaisseau",
  "size": "Heavy",
  "levels": {"advent": 40, "trade": 26, "battle": 69},
  "row": false,
  "ship_equipment": {
    "studding_sails": 3,
    "broadsides": 5,
    "special_equipment": 2,
    "bow_turret": 1,
    "extra_armouring": 3,
    "stern_turret": 1
  },
  "cabine": {"required": 65},
  "improvement": { "current": 0, "max": 4, "additional": 2},
  "days": 30,
  "ship_handling_proficiency": {"base": 200, "current": 200},
  "durability": {
    "base": 790, "improve": 0,
    "material": 0,
    "grade": 0,
    "improve_limit": {"base": 250, "grade": 0, "current": 250},
    "result": 790,
  },
  "vertical_sail": {
    "base": 115, "current": 115,
    "improve": {"base": 250, "current": 250},
    "base": 115, "base_diff": 0, "base_current": 115,
    "base_max_improve": 200, "base_max_diff": 0, "base_max_current": 0
  },
  "horizontal_sail": {
    "base": 115, "base_diff": 0, "base_current": 115,
    "base_max_improve": 200, "base_max_diff": 0, "base_max_current": 0
  },
  "row_power": [0, 0, 0],
  "turning_performance": [7, 22, 0],
  "wave_resistance": [7, 21, 0],
  "armouring_value": [40, 21, 0],
  "cabine_capacity": [135, 40, 0],
  "cabine_capacity_range": [-57, 67],
  "cabine_capacity_current": 135,
  "cannon_chambers_capacity": [100, 40, 0],
  "cannon_chambers_capacity_ranges": [-50, -20, -2, 50],
  "cannon_chambers_capacity_current": 100,
  "hold_capacity": [780, 41, 0],
  "hold_capacity_ranges": [-195, -156, 163, 195],
  "hold_capacity_current": 545,
  "skills_max": 2,
  "skill_inherited": "",
  "skill_original": "",
  "skills": [
    { "id": "00002045", "parts": [ "022000560", "022000622" ] },
    { "id": "00002063", "parts": [ "022000550", "022000680" ] },
    { "id": "00002064",  "parts": [ "02200036",  "022000560" ] },
    { "id": "00002100",  "parts": [ "022000560", "022000561" ] },
    { "id": "00002101",  "parts": [ "022000560", "022000560" ] }
  ],
  "grade": {"rank": 3, "type": "Battle Ship", "skills": []}
  },
  search_params: {
    lvlAdvent: {from: LVL_MIN, to: LVL_MAX},
    lvlTrade: {from: LVL_MIN, to: LVL_MAX},
    lvlBattle: {from: LVL_MIN, to: LVL_MAX},
    sails: true,
    row: true,
    steam: true,
    light: true,
    standard: true,
    heavy: true,
    adventure: true,
    trade: true,
    battle: true,
    nc: true,
    searchStr: '',
  },
  searchResult: [],
  improvements: [
    {
      _id: '1',
      parts: { sail: '', gunport: '', armament_1: '', armament_2: '' },
      ssip: 3,
    },
  ],
  grades: [
    {
      _id: '1',
      grade: { rank: 0, ship_type: 1, ship_skill: '', grade_skill: '' }
    },
  ],
};


function shipbuilder(state, action) {
  console.log(action);
  switch (action.type) {
    case LVL_ADVENTURE_SET:
      return Object.assign({}, state, {edit_id: action.payload});
    case SEARCH_SET:
      return Object.assign({}, state, {searchResult: action.payload});
    case SHIP_SET:
      return Object.assign({}, state, {ship: action.payload});
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(shipbuilder, initialState);
  const value = { state, dispatch };
  return (
    <Store.Provider value={value}>{props.children}</Store.Provider>
  );
}
