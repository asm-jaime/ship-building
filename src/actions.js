import {
  LVL_ADVENTURE_SET,
  LVL_ADVENTURE_INC,
  LVL_ADVENTURE_DEC,
  LVL_TRADE_SET,
  LVL_TRADE_INC,
  LVL_TRADE_DEC,
  LVL_BATTLE_SET,
  LVL_BATTLE_INC,
  LVL_BATTLE_DEC,
  DATA_LOAD,
} from './constants';

export const lvlAdvSet = (lvl) => dispatch => {
  dispatch({
    type: LVL_ADVENTURE_SET,
    payload: lvl
  });
};

export const lvlAdvInc = () => dispatch => {
  dispatch({ type: LVL_ADVENTURE_INC });
};

export const lvlAdvDec = () => dispatch => {
  dispatch({ type: LVL_ADVENTURE_DEC });
};

export const lvlTrdSet = (lvl) => dispatch => {
  dispatch({
    type: LVL_TRADE_SET,
    payload: lvl
  });
};

export const lvlTrdInc = () => dispatch => {
  dispatch({ type: LVL_TRADE_INC });
};

export const lvlTrdDec = () => dispatch => {
  dispatch({ type: LVL_TRADE_DEC });
};

export const lvlBtlSet = (lvl) => dispatch => {
  dispatch({
    type: LVL_BATTLE_SET,
    payload: lvl
  });
};

export const lvlBtlInc = () => dispatch => {
  dispatch({ type: LVL_BATTLE_INC });
};

export const lvlBtlDec = () => dispatch => {
  dispatch({ type: LVL_BATTLE_DEC });
};

// ========== DATA

export const dataLoadDefault = (dataDefault) => dispatch => {
  dispatch({type: DATA_LOAD, payload: dataDefault});
};
