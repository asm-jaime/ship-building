import React from 'react';
import {
  LVL_MIN,
  LVL_MAX,
  LVL_ADVENTURE_SET,
  SEARCH_SET,
  SHIP_SET,
  SHIP_CABINE_BASE_RANGE_SET,
  SHIP_CANNON_BASE_RANGE_SET,
  SHIP_HOLD_BASE_RANGE_SET,
} from './constants';

import { resolve, get_cargo, get_improve } from './StoreResolve.js';

export const Store = React.createContext();


const initialState = {
  ship: {
  "id": "50000192",
  "img": "00000192.png",
  "href": "http://uwodbmirror.ivyro.net/eg/main.php?id=50000192",
  "name": "First Class Vaisseau",
  "size": "Heavy",
  "purpose": "Battle",
  "levels": {"advent": 40, "trade": 26, "battle": 69},
  "row": false,
  "days": 30,
  "ship_equipment": {
    "studding_sails": 3,
    "broadsides": 5,
    "special_equipment": 2,
    "bow_turret": 1,
    "extra_armouring": 3,
    "stern_turret": 1
  },
  "improvement": { "result": 0,
    "limit": {"base": 4, "add": {"limit": 2, "current": 0}, "current": 4}
  },
  "ship_handling_proficiency": {"base": 200, "grade": 0, "result": 200},
  "durability": {
    "base": 790, "improve": 0,
    "material": 0,
    "grade": 0,
    "improve_limit": {"base": 250, "grade": 0, "current": 250},
    "result": 790,
  },
  "vertical_sail": {
    "base": 115, "improve": 100,
    "material": 0,
    "grade": 0,
    "penalty": 0,
    "improve_limit": {"base": 110, "grade": 0, "current": 110},
    "result": 215,
  },
  "horizontal_sail": {
    "base": 115, "improve": 0,
    "material": 0,
    "grade": 0,
    "penalty": 0,
    "improve_limit": {"base": 110, "grade": 0, "current": 110},
    "result": 115,
  },
  "row_power": {
    "base": 0, "improve": 0,
    "grade": 0,
    "penalty": 0,
    "improve_limit": {"base": 0, "grade": 0, "current": 0},
    "result": 0,
  },
  "turning_performance": {
    "base": 7, "improve": 0,
    "grade": 0,
    "penalty": 0,
    "improve_limit": {"base": 22, "grade": 0, "current": 22},
    "result": 7,
  },
  "wave_resistance": {
    "base": 7, "improve": 0,
    "grade": 0,
    "penalty": 0,
    "improve_limit": {"base": 21, "grade": 0, "current": 21},
    "result": 7,
  },
  "armouring_value": {
    "base": 40, "improve": 0,
    "grade": 0,
    "improve_limit": {"base": 21, "grade": 0, "current": 21},
    "result": 40,
  },
  "cabine_capacity": {
    "base": 135, "improve": 0,
    "grade": 0,
    "base_ranged": 135,
    "improve_limit": {"base": 40, "grade": 0, "current": 40},
    "required": 65,
    "result": 135,
  },
  "cannon_chambers_capacity": {
    "base": 100, "improve": 0,
    "grade": 0,
    "base_ranged": 100,
    "improve_limit": {"base": 40, "grade": 0, "current": 40},
    "result": 100
  },
  "hold_capacity": {
    "base": 780, "improve": 10,
    "base_ranged": 780,
    "grade": 0,
    "improve_limit": {"base": 41, "grade": 0, "current": 41},
    "result": 790
  },
  "cargo": {
    "result": 545
  },
  "material": {
    "name": "Beech Paneling",
    "durability": 1.0,
    "sail": 1.0
  },
  "skills": {
    "available": [
      { "id": "00002045", "parts": [ "022000560", "022000622" ] },
      { "id": "00002063", "parts": [ "022000550", "022000680" ] },
      { "id": "00002064", "parts": [ "02200036",  "022000560" ] },
      { "id": "00002100", "parts": [ "022000560", "022000561" ] },
      { "id": "00002101", "parts": [ "022000560", "022000560" ] }
    ],
    "optional": { "base": 2, "grade": 0, "set": [
      { "id": "00002045", "parts": [ "022000560", "022000622" ] },
      { "id": "00002063", "parts": [ "022000550", "022000680" ] },
      { "id": "00002100", "parts": [ "022000560", "022000561" ] }
    ]},
    "inherited": "",
    "original": "00002121",
  },
  "grade": {"rank": 3, "type": "Battle Ship", "skills": ["00004013", "00004018"]}
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
      _id: 'G0G1',
      grade: { rank: 0, ship_type: 1, ship_skill: '', grade_skill: '' }
    },
  ],
};

function shipbuilder(state, action) {
  console.log(action);
  switch (action.type) {
    case LVL_ADVENTURE_SET: {
      return {...state, edit_id: action.payload};
    }
    case SEARCH_SET: {
      return {...state, searchResult: action.payload};
    }
    case SHIP_SET: {
      return {...state, ship: action.payload};
    }
    case SHIP_CABINE_BASE_RANGE_SET: {
      const improve = get_improve(
        state.ship.cabine_capacity.improve_limit.current,
        state.ship.cabine_capacity.improve
      );
      const cabine = resolve.cabine_capacity(
        state.ship.cabine_capacity, action.payload, improve
      );

      const cargo = get_cargo(
        state.ship.cargo, state.ship.hold_capacity,
        cabine, state.ship.cannon_chambers_capacity
      );

      const ship = {...state.ship, cabine_capacity: cabine, cargo};
      return {...state, ship};
    }
    case SHIP_CANNON_BASE_RANGE_SET: {
      const improve = get_improve(
        state.ship.cannon_chambers_capacity.improve_limit.current,
        state.ship.cannon_chambers_capacity.improve
      );
      const cannon = resolve.cannon_chambers_capacity(
        state.ship.cannon_chambers_capacity, action.payload, improve
      );

      const cargo = get_cargo(
        state.ship.cargo, state.ship.hold_capacity,
        state.ship.cabine_capacity, cannon
      );

      const ship = {...state.ship, cannon_chambers_capacity: cannon, cargo};
      return {...state, ship};
    }
    case SHIP_HOLD_BASE_RANGE_SET: {
      const improve = get_improve(
        state.ship.hold_capacity.improve_limit.current,
        state.ship.hold_capacity.improve
      );
      const hold = resolve.hold_capacity(
        state.ship.hold_capacity, action.payload, improve
      );

      const cargo = get_cargo(
        state.ship.cargo, hold, state.ship.cabine_capacity,
        state.ship.cannon_chambers_capacity
      );

      const ship = {...state.ship, hold_capacity: hold, cargo};
      return {...state, ship};
    }
    default: {
      return state;
    }
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(shipbuilder, initialState);
  const value = { state, dispatch };
  return (
    <Store.Provider value={value}>{props.children}</Store.Provider>
  );
}
