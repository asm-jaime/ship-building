import { IMPROVEABLE_PROPERTIES } from './constants';

import Sails from './resSails';
import Gunports from './resGunports';
import Armaments from './resArmaments';

const durability = (durability, improve) => ({
    ...durability,
    result: durability.base + durability.material + durability.grade + improve,
});

const vertical = (vertical, improve) => ({
  ...vertical,
  result:  vertical.base + vertical.material +
  vertical.grade + vertical.penalty + improve,
});

const horizontal = (horizontal, improve) => ({
  ...horizontal,
  result: horizontal.material +
  horizontal.grade + horizontal.penalty + improve,
});

const row = (row, improve) => ({
  ...row,
  result: row.grade + row.penalty + improve,
});

const turning = (turning, improve) => ({
  ...turning,
  result: turning.grade + turning.penalty + improve,
});

const wave = (wave, improve) => ({
  ...wave,
  result: wave.grade + wave.penalty + improve,
});

const armouring = (armouring, improve) => ({
  ...armouring,
  result: armouring.grade + armouring.penalty
    + (improve || armouring.improve),
});

const cabine = (cabine, improve, ranged) => ({
  ...cabine,
  base_ranged: ranged || cabine.base_ranged,
  result: cabine.grade +
  (improve || cabine.improve) +
  (ranged  || cabine.base_ranged),
});

const cannon = (cannon, improve, ranged) => ({
  ...cannon,
  base_ranged: ranged || cannon.base_ranged,
  result: cannon.grade +
  (improve || cannon.improve) +
  (ranged  || cannon.base_ranged),
});

const hold = (hold, improve, ranged) => ({
  ...hold,
  base_ranged: ranged || hold.base_ranged,
  result: hold.grade +
  (improve || hold.improve) +
  (ranged  || hold.base_ranged),
});

export const get_cargo = (cargo, hold, cabine, chambers) => ({
  ...cargo,
  result: hold.result - cabine.base_ranged - chambers.base_ranged,
});

export const get_improve = (limit, improve) => (
  Math.sign(improve) * Math.min(Math.abs(improve), Math.abs(limit))
);

export const get_iranges = (improve_steps) => {
  const result = IMPROVEABLE_PROPERTIES.map(improve => [0, 0]);

  // add to the iranges the only exist improve material
  const iranges = [];
  for(let i = 0; i < improve_steps.length; ++i) {
    if(improve_steps[i].active === false) {
      continue;
    }

    const step = improve_steps[i];
    if(step['sail']) {
      iranges.push(Sails[step['sail']]['stats_ranges']);
    }
    if(step['gunport']) {
      iranges.push(Gunports[step['gunport']]['stats_ranges']);
    }
    if(step['armament_1']) {
      iranges.push(Armaments[step['armament_1']]['stats_ranges']);
    }
    if(step['armament_2']) {
      iranges.push(Armaments[step['armament_2']]['stats_ranges']);
    }
  }

  for(let i = 0; i < iranges.length; ++i) {
    for(let j = 0; j < iranges[i].length; ++j) {
      result[j][0] += iranges[i][j][0];
      result[j][1] += iranges[i][j][1];
    }
  }

  return result;
}

export const get_iaverages = (iranges) => {
  const res = Array.apply(0, {length: iranges.length})
    .map((e, num) => (
      parseInt(Math.ceil((iranges[num][0] + iranges[num][1])/2))
    ));
  return res;
}

export const apply_improves = (ship, iaverages) => {
  const result = Object.create(null);
  for(let i = 0; i < IMPROVEABLE_PROPERTIES.length; ++i) {
    const property = IMPROVEABLE_PROPERTIES[i];
    const improve = iaverages[i];
    const limited = get_improve(ship[property]['improve_limit']['current'], improve);
    result[property] = resolve[property]({ ...ship[property], improve }, limited);
  }
  return {...ship, ...result};
}

export const resolve = {
  "durability": durability,
  "vertical_sail": vertical,
  "horizontal_sail": horizontal,
  "row_power": row,
  "turning_performance": turning,
  "wave_resistance": wave,
  "armouring_value": armouring,
  "cabine_capacity": cabine,
  "cannon_chambers_capacity": cannon,
  "hold_capacity": hold,
}
