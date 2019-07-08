import React from 'react';
import { LVL_ADVENTURE_SET } from './constants.js';

export const Store = React.createContext();

const initialState = {
  ship: {
  },
  search_params: {
    lvl_advent: {from: 0, to: 87},
    lvl_trade: {from: 0, to: 87},
    lvl_battle: {from: 0, to: 87},
    sails: true,
    row: true,
    steam: true,
    light: true,
    standard: true,
    heavy: true,
    adventure: true,
    trade: true,
    battle: true,
    nc_ship: true,
    search_string: '',
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
  switch (action.type) {
    case LVL_ADVENTURE_SET:
      return Object.assign({}, state, {edit_id: action.payload});
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
