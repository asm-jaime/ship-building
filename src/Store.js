import React from 'react';
import {
  LVL_MIN,
  LVL_MAX,
  LVL_ADVENTURE_SET,
  SEARCH_SET
} from './constants';

export const Store = React.createContext();

const initialState = {
  ship: {
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
  search_result: [],
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
      return Object.assign({}, state, {search_result: action.payload});
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
