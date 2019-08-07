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
  IMPROVE_ACTIVE_TOGGLE,
  IMPROVE_DEL,
  IMPROVE_ADD,
  GRADE_DEL,
  RECALCULATE_ALL,
  PANEL_SET,
  SKILL_ORIGINAL_SET,
  SKILL_OPTIONAL_SET,
  SKILL_EMPTY,
} from './constants';

import {
  get_cargo,
  get_iranges,
  get_iaverages,
  apply_improves,
  get_grading,
  get_grade,
  get_paneling,
} from './StoreResolve.js';

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
    "result": 0
  },
  "vertical_sail": {
    "base": 115, "improve": 0,
    "material": 0,
    "grade": 0,
    "penalty": 0,
    "improve_limit": {"base": 110, "grade": 0, "current": 110},
    "result": 0
  },
  "horizontal_sail": {
    "base": 115, "improve": 0,
    "material": 0,
    "grade": 0,
    "penalty": 0,
    "improve_limit": {"base": 110, "grade": 0, "current": 110},
    "result": 0
  },
  "row_power": {
    "base": 0, "improve": 0,
    "grade": 0,
    "penalty": 0,
    "improve_limit": {"base": 0, "grade": 0, "current": 0},
    "result": 0
  },
  "turning_performance": {
    "base": 7, "improve": 0,
    "grade": 0,
    "penalty": 0,
    "improve_limit": {"base": 22, "grade": 0, "current": 22},
    "result": 0
  },
  "wave_resistance": {
    "base": 7, "improve": 0,
    "grade": 0,
    "penalty": 0,
    "improve_limit": {"base": 21, "grade": 0, "current": 21},
    "result": 0
  },
  "armouring_value": {
    "base": 40, "improve": 0,
    "grade": 0,
    "improve_limit": {"base": 21, "grade": 0, "current": 21},
    "result": 0
  },
  "cabine_capacity": {
    "base": 135, "improve": 0,
    "grade": 0,
    "base_ranged": 135,
    "improve_limit": {"base": 40, "grade": 0, "current": 40},
    "required": 65,
    "result": 0
  },
  "cannon_chambers_capacity": {
    "base": 100, "improve": 0,
    "grade": 0,
    "base_ranged": 100,
    "improve_limit": {"base": 40, "grade": 0, "current": 40},
    "result": 0
  },
  "hold_capacity": {
    "base": 780, "improve": 0,
    "base_ranged": 780,
    "grade": 0,
    "improve_limit": {"base": 41, "grade": 0, "current": 41},
    "result": 0
  },
  "cargo": {
    "result": 545
  },
  "material": {
    "name": "Beech Paneling",
  },
  "skills": {
    "available": [
      { "id": "00002045", "parts": [ "022000560", "022000622" ] },
      { "id": "00002063", "parts": [ "022000550", "022000680" ] },
      { "id": "00002064", "parts": [ "02200036",  "022000560" ] },
      { "id": "00002100", "parts": [ "022000560", "022000561" ] },
      { "id": "00002101", "parts": [ "022000560", "022000560" ] }
    ],
    "optional": { "limit": 2, "grade": 1, "set": [
      { "id": "00002045", "parts": [ "022000560", "022000622" ] },
    ]},
    "inherit": "00002128",
    "original": "00002121"
  },
  "grade_size": 4,
  "grade_type_default": 'Battle Ship',
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
    searchStr: ''
  },
  message: 'nothing to report',
  searchResult: [],
  improvements: [
    {
      active: true, sail: '022000213', gunport: '',
      armament_1: '022000560', armament_2: '022000560'
    }, {
      active: true, sail: '022000213', gunport: '',
      armament_1: '022000560', armament_2: '022000560'
    }, {
      active: true, sail: '022000213', gunport: '',
      armament_1: '022000560', armament_2: '022000560'
    }, {
      active: true, sail: '022000213', gunport: '',
      armament_1: '022000560', armament_2: '022000560'
    }, {
      active: true, sail: '022000213', gunport: '',
      armament_1: '022000560', armament_2: '022000560'
    }, {
      active: true, sail: '022000213', gunport: '',
      armament_1: '022000560', armament_2: '022000560'
    }, {
      active: true, sail: '022000213', gunport: '',
      armament_1: '022000560', armament_2: '022000560'
    }, {
      active: true, sail: '022000213', gunport: '',
      armament_1: '022000560', armament_2: '022000560'
    }, {
      active: true, sail: '022000213', gunport: '',
      armament_1: '022000560', armament_2: '022000560'
    }, {
      active: true, sail: '022000213', gunport: '',
      armament_1: '022000560', armament_2: '022000560'
    }, {
      active: true, sail: '022000213', gunport: '',
      armament_1: '022000560', armament_2: '022000560'
    }, {
      active: true, sail: '022000213', gunport: '',
      armament_1: '022000560', armament_2: '022000560'
    }
  ],
  grades: [
    { type: 'Battle Ship', skill: {id: '00004021', inherit: '00002128'} },
    { type: 'High Speed Battle Ship', skill: {id: ''} },
    { type: 'Expedition Ship', skill: {id: '00004012'} },
    { type: 'High Speed Cargo Ship', skill: {id: '' } },
    { type: 'Cargo Ship', skill: {id: '' } },
    { type: 'Armed Merchant Ship', skill: {id: '00004000'} },
    { type: 'Generic Ship', skill: {id: ''} },
    { type: 'High Speed Battle Ship', skill: {id: ''} }
  ]
};

function shipbuilder(state, action) {
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
      const cabine = {
        ...state.ship.cabine_capacity, base_ranged: action.payload
      };

      const cargo = get_cargo(
        state.ship.cargo, state.ship.hold_capacity,
        cabine, state.ship.cannon_chambers_capacity
      );

      const ship = {...state.ship, cabine_capacity: cabine, cargo};
      return {...state, ship};
    }
    case SHIP_CANNON_BASE_RANGE_SET: {
      const cannon = {
        ...state.ship.cannon_chambers_capacity, base_ranged: action.payload
      };

      const cargo = get_cargo(
        state.ship.cargo, state.ship.hold_capacity,
        state.ship.cabine_capacity, cannon
      );

      const ship = {...state.ship, cannon_chambers_capacity: cannon, cargo};
      return {...state, ship};
    }
    case SHIP_HOLD_BASE_RANGE_SET: {
      const hold = {
        ...state.ship.hold_capacity, base_ranged: action.payload
      };

      const cargo = get_cargo(
        state.ship.cargo, hold, state.ship.cabine_capacity,
        state.ship.cannon_chambers_capacity
      );

      const ship = {...state.ship, hold_capacity: hold, cargo};
      return {...state, ship};
    }
    case IMPROVE_ACTIVE_TOGGLE: {
      const improvements = state.improvements.map((improve, i) => (
        (i === action.payload)
        ? { ...improve, active: !(improve.active) }
        : improve
      ));
      const averages = get_iaverages(get_iranges(improvements));
      const ship = apply_improves(state.ship, averages);
      const cargo = get_cargo(
        ship.cargo, ship.hold_capacity, ship.cabine_capacity,
        ship.cannon_chambers_capacity
      );
      return {...state, ship: {...ship, cargo}, improvements};
    }
    case IMPROVE_ADD: {
      const improvements = [...state.improvements, action.payload];
      const averages = get_iaverages(get_iranges(improvements));
      const ship = apply_improves(state.ship, averages);
      const cargo = get_cargo(
        ship.cargo, ship.hold_capacity, ship.cabine_capacity,
        ship.cannon_chambers_capacity
      );
      return {...state, ship: {...ship, cargo}, improvements};
    }
    case IMPROVE_DEL: {
      const improvements = state.improvements.filter((improve, i) => (i !== action.payload));
      const averages = get_iaverages(get_iranges(improvements));
      const ship = apply_improves(state.ship, averages);
      const cargo = get_cargo(
        ship.cargo, ship.hold_capacity, ship.cabine_capacity,
        ship.cannon_chambers_capacity
      );
      return {...state, ship: {...ship, cargo}, improvements};
    }
    case GRADE_DEL: {
      const grades = state.grades.splice(0, action.payload);
      const ship_temp = get_grade(state.ship, grades);
      const ship = get_grading(ship_temp, grades);
      return {...state, ship, grades};
    }
    case RECALCULATE_ALL: {
      const improvements = state.improvements;
      const averages = get_iaverages(get_iranges(improvements));
      const ship_improved = apply_improves(state.ship, averages);

      {
        const grades = state.grades;
        const ship_temp = get_grade(ship_improved, grades);
        const ship = get_grading(ship_temp, grades);
        return {...state, ship};
      }

    }
    case SKILL_OPTIONAL_SET: {
      const skills = state.ship.skills.optional.set;
      if(action.payload === SKILL_EMPTY) {
        return {...state, message: 'can not set the empty optional skill'};
      }
      if(state.ship.skills.optional.set.find(
        e => e['id'] === action.payload
      )) {
        return {...state, message: 'can not set the same optional skill'};
      }
      if(skills.length + 1 >
          state.ship.skills.optional.limit +
          state.ship.skills.optional.grade
      ) {
        return {...state, message: 'can not add more optional skill'};
      }
      const skill = state.ship.skills.available.find(
        e => e['id'] === action.payload
      );

      return {
        ...state,
        ship: {
          ...state.ship,
          skills: {
            ...state.ship.skills,
            optional: {
              ...state.ship.skills.optional,
              set: [
                ...state.ship.skills.optional.set,
                skill
              ]
            },
          }
        }
      };
    }
    case SKILL_ORIGINAL_SET: {
      return {
        ...state,
        ship: {
          ...state.ship,
          skills: {
            ...state.ship.skills,
            original: action.payload,
          }
        }
      };
    }
    case PANEL_SET: {
      const ship = get_paneling(state.ship, action.payload);
      return {
        ...state,
        ship,
      };
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
