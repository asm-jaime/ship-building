import {
  IMPROVEABLE_PROPERTIES,
  GRADE_LIMITS,
  GRADE_BONUS,
  GRADE_IMPROVE,
  GRADE_IMPROVES,
  SHIP_PART_EMPTY,
  SKILL_EMPTY,
  SHIP_BUILDING_RANK,
  SHIP_SIZE_POS,
  SHIP_STAT_NAMES,
  GENERAL_LARGE_OAR,
  GENERAL_MEDIUM_OAR,
  GENERAL_SMALL_OAR,
  SPECIAL_ORDER_LARGE_OAR,
  SPECIAL_ORDER_LIGHT_OAR,
  SKILL_ROWING_ASSISTANCE,
  SKILL_IMPROVED_RAM,
  SKILL_SPECIAL_RAM,
  SKILL_RAMMING_TACTICS,
  SKILL_IMPROVED_SEA_MINE,
  SKILL_EVADE_MELEE_BATTLE,
  GRADE_SPEEDUP_I,
  GRADE_SPEEDUP_II,
  GRADE_SPEEDUP_III,
  GRADE_SKILL_SLOT_I,
  GRADE_SKILL_SLOT_II,
  GRADE_ROW_IMPROVE,
  SHIP_TYPE_ADVENTURE,
  SHIP_TYPE_TRADE,
  SHIP_TYPE_BATTLE,
  SHIP_SIZE_LIGHT,
  SHIP_SIZE_STANDARD,
  SHIP_SIZE_HEAVY,
} from './constants';

import Sails from './resSails';
import Gunports from './resGunports';
import Armaments from './resArmaments';
import Panels from './resPanels';
import Skills from './resSkills';

// ========== get information from stats

export const get_base_ship_stat = {
  "durability": e => e.base + e.material,
  "vertical_sail": e => e.base + e.material,
  "horizontal_sail": e => e.base + e.material,
  "row_power": e => e.base,
  "turning_performance": e => e.base,
  "wave_resistance": e => e.base,
  "armouring_value": e => e.base,
  "cabine_capacity": e => e.base_ranged,
  "cannon_chambers_capacity": e => e.base_ranged,
  "hold_capacity": e => e.base_ranged,
};

export const get_max_ship_bonus = {
  "durability": e => e.improve + e.grade + e.custom,
  "vertical_sail": e => e.improve + e.grade + e.custom + e.penalty,
  "horizontal_sail": e => e.improve + e.grade + e.custom + e.penalty,
  "row_power": e => e.improve + e.grade + e.custom + e.penalty,
  "turning_performance": e => e.improve + e.grade + e.custom + e.penalty,
  "wave_resistance": e => e.improve + e.grade + e.custom + e.penalty,
  "armouring_value": e => e.improve + e.grade + e.custom,
  "cabine_capacity": e => e.improve + e.grade + e.custom,
  "cannon_chambers_capacity": e => e.improve + e.grade + e.custom,
  "hold_capacity": e => e.improve + e.grade + e.custom,
};

// ========== resolver section

const durability = (durability) => ({
  ...durability,
  result:  get_improve(
    durability['improve_limit']['current'],
    durability.material + durability.grade +
    durability.improve + durability.custom
  )
});

const vertical = (vertical) => ({
  ...vertical,
  result: get_improve(
    vertical['improve_limit']['current'],
    vertical.material + vertical.grade +
    vertical.penalty + vertical.improve + vertical.custom
  )
});

const horizontal = (horizontal) => ({
  ...horizontal,
  result: get_improve(
    horizontal['improve_limit']['current'],
    horizontal.material + horizontal.grade +
    horizontal.penalty + horizontal.improve + horizontal.custom
  ),
});

const row = (row) => {
  if(row.row === false) {
    return row;
  } else {
    return {
      ...row,
      result: get_improve(
        row['improve_limit']['current'],
        row.grade + row.penalty + row.improve + row.custom
      )
    };
  }
};

const turning = (turning) => ({
  ...turning,
  result: get_improve(
    turning['improve_limit']['current'],
    turning.grade + turning.penalty + turning.improve + turning.custom
  )
});

const wave = (wave) => ({
  ...wave,
  result: get_improve(
    wave['improve_limit']['current'],
    wave.grade + wave.penalty + wave.improve + wave.custom
  )
});

const armouring = (armouring) => ({
  ...armouring,
  result: get_improve(
    armouring['improve_limit']['current'],
    armouring.grade + armouring.improve + armouring.custom
  )
});

const cabine = (cabine) => ({
  ...cabine,
  result: get_improve(
    cabine['improve_limit']['current'],
    cabine.grade + cabine.improve + cabine.custom
  )
});

const cannon = (cannon) => ({
  ...cannon,
  result: get_improve(
    cannon['improve_limit']['current'],
    cannon.grade + cannon.improve + cannon.custom
  )
});

const hold = (hold) => ({
  ...hold,
  result: get_improve(
    hold['improve_limit']['current'],
    hold.grade + hold.improve + hold.custom
  )
});

export const get_cargo = (cargo, hold, cabine, chambers) => ({
  ...cargo,
  result: hold.base_ranged + hold.result -
          cabine.base_ranged - cabine.result -
          chambers.base_ranged - chambers.result,
});

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
};

// ========== ranges calculation section

const get_max_safe_hold = (hold) => {
  const percent = (101 + SHIP_BUILDING_RANK) / 100;
  const max_hold = Math.floor(hold * percent);

  let tmp1 = 0;
  let tmp2 = 0;
  let tmp3 = max_hold + 5;

  for(let i = -5; i < 6; ++i) {
    tmp1 = max_hold + i;

    if(hold === 0) {
      tmp2 = 0;
    } else {
      tmp2 = tmp1 / hold;
    }

    if (tmp2 >= percent) {
      break;
    }
    tmp3 = tmp1;
  }
  return tmp3;
};

const get_min_safe_hold = (hold) => {
  const percent = (100 - SHIP_BUILDING_RANK) / 100;
  const min_hold = Math.floor(hold * percent);

  let tmp1 = 0;
  let tmp2 = 0;
  let tmp3 = min_hold + 5;

  for (let i = 5; i > -6; --i) {
    tmp1 = min_hold + i;

    if(hold === 0) {
      tmp2 = 0;
    } else {
      tmp2 = tmp1 / hold;
    }

    if (tmp2 < percent) {
      break;
    }
    tmp3 = tmp1;
  }

  return tmp3;
};

export const get_hold_ranges = (hold) => {
  const smax = SHIP_BUILDING_RANK + 5;
  const smin = - (SHIP_BUILDING_RANK + 5);
  const max_hold = parseInt(hold * (1 + smax / 100));
  const min_hold = parseInt(hold * (1 + smin / 100));

  const max_safe = get_max_safe_hold(hold);
  const min_safe = get_min_safe_hold(hold);

  return [min_hold, min_safe, max_safe, max_hold];
};

export const get_cabin_ranges = (cabin, required) => {
  const req = parseInt(required * 1.2);
  const cab = parseInt(cabin * 0.5);

  const min = (req < cab) ? cab : req;
  const max = parseInt(cabin * 1.5);

  return [min, max];
};

export const get_cannon_ranges = (cannons) => {
  return [parseInt(cannons * 0.5), parseInt(cannons * 1.5)];
};

// ========== improvement section

export const get_improve = (limit, improve) => (
  Math.sign(improve) * Math.min(Math.abs(improve), Math.abs(limit))
);

export const get_iranges = (improve_steps) => {
  const result = IMPROVEABLE_PROPERTIES.map(improve => [0, 0]);
  const AllArmaments = {...Armaments, ...Panels};

  // add to the iranges the only exist improve material
  const iranges = [];
  for(let i = 0; i < improve_steps.length; ++i) {
    if(improve_steps[i].active === false) {
      continue;
    }

    const step = improve_steps[i];
    if(step['sail'] && step['sail'] !== SHIP_PART_EMPTY) {
      iranges.push(Sails[step['sail']]['stats_ranges']);
    }
    if(step['gunport'] && step['gunport'] !== SHIP_PART_EMPTY) {
      iranges.push(Gunports[step['gunport']]['stats_ranges']);
    }
    if(step['armament_1'] && step['armament_1'] !== SHIP_PART_EMPTY) {
      iranges.push(AllArmaments[step['armament_1']]['stats_ranges']);
    }
    if(step['armament_2'] && step['armament_2'] !== SHIP_PART_EMPTY) {
      iranges.push(AllArmaments[step['armament_2']]['stats_ranges']);
    }
  }

  for(let i = 0; i < iranges.length; ++i) {
    for(let j = 0; j < iranges[i].length; ++j) {
      result[j][0] += iranges[i][j][0];
      result[j][1] += iranges[i][j][1];
    }
  }

  return result;
};

export const get_iaverages = (iranges) => {
  const res = Array.apply(0, {length: iranges.length})
    .map((e, num) => (
      parseInt(Math.ceil((iranges[num][0] + iranges[num][1])/2))
    ));
  return res;
};

export const apply_improves = (ship, iaverages) => {
  const result = Object.create(null);
  for(let i = 0; i < IMPROVEABLE_PROPERTIES.length; ++i) {
    const property = IMPROVEABLE_PROPERTIES[i];
    result[property] = resolve[property](
      {...ship[property], improve: iaverages[i]}
    );
  }
  return {...ship, ...result};
};

export const get_stat_string = (stats) => {
  const result = [];
  for(let i = 0; i < IMPROVEABLE_PROPERTIES.length; ++i) {
    if(stats[i][0] !== 0 || stats[i][1] !== 0) {
      result.push(`${SHIP_STAT_NAMES[IMPROVEABLE_PROPERTIES[i]]}: ${
        stats[i][0]}~${stats[i][1]
      }`);
    }
  }

  return result.join(', ');
};

// ========== grade section

export const recalculate = (ship) => {
  const result = Object.create(null);
  for(let i = 0; i < IMPROVEABLE_PROPERTIES.length; ++i) {
    const property = IMPROVEABLE_PROPERTIES[i];
    result[property] = resolve[property](ship[property]);
  }
  const cargo = get_cargo(
    ship.cargo,
    result['hold_capacity'],
    result['cabine_capacity'],
    result['cannon_chambers_capacity']
  );
  return {...ship, ...result, cargo};
};

export const get_grade = (ship, grades) => {
  const result = [];
  const inherit = [];

  let optional_skill_grade = 0;
  for(let i = 0; i < grades.length; ++i) {
    if(grades[i]['skills']['grade'] &&
       grades[i]['skills']['grade'] !== SKILL_EMPTY
      ) {
      result.push(grades[i]['skills']['grade']);
    }
    if(grades[i]['skills'].hasOwnProperty('inherit') &&
       grades[i]['skills']['inherit'] !== SKILL_EMPTY
    ) {
      inherit.push(grades[i]['skills']['inherit']);
    }

    if(grades[i]['skills']['grade'] &&
       grades[i]['skills']['grade'] === GRADE_SKILL_SLOT_I
      ) {
      optional_skill_grade = 1;
    }
    if(grades[i]['skills']['grade'] &&
       grades[i]['skills']['grade'] === GRADE_SKILL_SLOT_II
      ) {
      optional_skill_grade = 2;
    }
  }

  const grade = {
    ...ship.grade,
    skills: result,
    rank: grades.length,
    type: grades.length ? grades[grades.length - 1]['type'] : 'Generic Ship',
  };

  return {
    ...ship,
    skills: {
      ...ship.skills,
      inherit,
      optional: {
        ...ship.skills.optional,
        grade: optional_skill_grade
      }
    },
    grade,
  };
};

export const get_grading = (ship, grade) => {
  const ship_handling_proficiency = {
    ...ship.ship_handling_proficiency,
    grade: 5 * grade.length,
    result: ship.ship_handling_proficiency.base + 5 * grade.length,
  };

  const grading = (property, name, pos) => {
    const skill_improve = ship.grade.skills.filter(
      e => (e === GRADE_IMPROVES[name])
    );
    const property_grade = skill_improve.length
      ? GRADE_IMPROVE[skill_improve[0]][ship.grade_size]
      : 0
      + ship.grade.rank
      ? GRADE_BONUS[ship.grade.type][ship.grade.rank - 1][pos]
      : 0;

    const grade_limit = ship.grade.rank
        ? GRADE_LIMITS[name](ship.grade.rank)
        : ship[name].improve_limit.grade;

    const result = {
      ...ship[name],
      grade: property_grade,
      improve_limit: {
        ...ship[name].improve_limit,
        grade: grade_limit,
        current: ship[name].improve_limit.base + grade_limit,
      },
    };

    return result;
  }

  const graded = Object.create(null);
  const keys = Object.keys(GRADE_IMPROVES);
  for(let i = 0; i < keys.length; ++i) {
    graded[keys[i]] = grading(ship[keys[i]], keys[i], i);
  }

  return recalculate({...ship, ship_handling_proficiency, ...graded});
};

// ========== material/panel

export const get_paneling = (ship, panel) => {
  const dura = {
    ...ship.durability,
    material: -ship.durability.base +
      parseInt(panel.panel_stats[0] * ship.durability.base),
  };
  const vertical = {
    ...ship.vertical_sail,
    material: -ship.vertical_sail.base +
      parseInt(panel.panel_stats[1] * ship.vertical_sail.base),
  };
  const horizontal = {
    ...ship.horizontal_sail,
    material: -ship.horizontal_sail.base +
      parseInt(panel.panel_stats[1] * ship.horizontal_sail.base),
  };

  return {
    ...ship,
    durability: dura,
    vertical_sail: vertical,
    horizontal_sail: horizontal,
    material: panel
  };
};

// ========== custom filters

export const get_available_gunports = (ship, resource) => {
  const result = [];

  const set = Object.keys(resource);
  for(let i = 0; i < set.length; ++i) {
    if(set[i] === SHIP_PART_EMPTY) {
      continue;
    }
    if(resource[set[i]]['ship_sizes'][SHIP_SIZE_POS[ship.size]] === false) {
      continue;
    }

    result.push(set[i]);
  }

  return result;
};

export const get_available_sails = (ship, resource) => {
  const result = [];

  const set = Object.keys(resource);
  for(let i = 0; i < set.length; ++i) {
    if(set[i] === SHIP_PART_EMPTY) {
      continue;
    }
    if(resource[set[i]]['ship_sizes'][SHIP_SIZE_POS[ship.size]] === false) {
      continue;
    }

    result.push(set[i]);
  }

  return result;
};

export const get_available_armaments = (ship, resource) => {
  const result = [];

  const set = Object.keys(resource);
  for(let i = 0; i < set.length; ++i) {
    if(set[i] === SHIP_PART_EMPTY) {
      continue;
    }
    if(ship.row_power.row === false && (
       set[i] === GENERAL_LARGE_OAR ||
       set[i] === GENERAL_MEDIUM_OAR ||
       set[i] === GENERAL_SMALL_OAR ||
       set[i] === SPECIAL_ORDER_LARGE_OAR ||
       set[i] === SPECIAL_ORDER_LIGHT_OAR)
    ) {
      continue;
    }
    if(resource[set[i]]['ship_sizes'][SHIP_SIZE_POS[ship.size]] === false) {
      continue;
    }

    result.push(set[i]);
  }

  return result;
};

export const get_available_panels = (ship, resource) => {
  const result = [];

  const set = Object.keys(resource);
  for(let i = 0; i < set.length; ++i) {
    if(set[i] === SHIP_PART_EMPTY) {
      continue;
    }
    if(resource[set[i]]['ship_sizes'][SHIP_SIZE_POS[ship.size]] === false) {
      continue;
    }

    result.push(set[i]);
  }

  return result;
};

export const get_available_optional_skills = (ship) => {
  const result = [];

  const set = ship.skills.available;
  for(let i = 0; i < set.length; ++i) {
    if(set[i] === SKILL_EMPTY) {
      continue;
    }
    if(ship.skills.optional.set.length &&
       ship.skills.optional.set.find(e => set[i]['id'] === e['id'])) {
      continue;
    }
    if(ship.skills.inherit.find(e => set[i]['id'] === e)) {
      continue;
    }
    if(set[i]['id'] === ship.skills.original) {
      continue;
    }
    result.push(set[i]['id']);
  }

  return result;
};

export const get_available_original_skills = (ship, resource) => {
  const result = [];

  const set = Object.keys(resource);
  for(let i = 0; i < set.length; ++i) {
    if(set[i] === SKILL_EMPTY) {
      continue;
    }
    if(ship.row_power.row === false && (
      set[i] === SKILL_ROWING_ASSISTANCE ||
      set[i] === SKILL_IMPROVED_RAM ||
      set[i] === SKILL_SPECIAL_RAM ||
      set[i] === SKILL_RAMMING_TACTICS )
    ) {
      continue;
    }
    if(resource[set[i]]['original'] === false) {
      continue;
    }
    if(ship.skills.optional.set.find(e => set[i] === e['id'])) {
      continue;
    }
    if(ship.skills.inherit.find(e => set[i] === e['id'])) {
      continue;
    }
    if(set[i] === ship.skills.original) {
      continue;
    }
    result.push(set[i]);
  }

  return result;
};

export const get_available_grade_skills = (ship, resource) => {
  const result = [];

  const set = Object.keys(resource);
  for(let i = 0; i < set.length; ++i) {
    if(set[i] === SKILL_EMPTY) {
      continue;
    }
    if(ship.grade.skills.find(e => e === set[i])) {
      continue;
    }
    if(set[i] === GRADE_SPEEDUP_II &&
       !ship.grade.skills.find(e => e === GRADE_SPEEDUP_I)) {
      continue;
    }
    if(set[i] === GRADE_SPEEDUP_III &&
       !ship.grade.skills.find(e => e === GRADE_SPEEDUP_II)) {
      continue;
    }
    if(set[i] === GRADE_SKILL_SLOT_II &&
      !ship.grade.skills.find(e => e === GRADE_SKILL_SLOT_I)) {
      continue;
    }
    if(ship.row_power.row === false &&
      set[i] === GRADE_ROW_IMPROVE) {
      continue;
    }

    result.push(set[i]);
  }

  return result;
};

export const get_inheritable_skills = (ship, resource) => {
  const result = [];

  const set = Object.keys(resource);
  for(let i = 0; i < set.length; ++i) {
    if(set[i] === SKILL_EMPTY) {
      continue;
    }
    if(resource[set[i]]['original'] === false) {
      continue;
    }
    if(ship.skills.optional.set.find(e => set[i] === e['id'])) {
      continue;
    }
    if(ship.skills.inherit.find(e => set[i] === e['id'])) {
      continue;
    }
    if(set[i] === ship.skills.original) {
      continue;
    }
    if(ship.row_power.row === false && (
      set[i] === SKILL_ROWING_ASSISTANCE ||
      set[i] === SKILL_IMPROVED_RAM ||
      set[i] === SKILL_SPECIAL_RAM ||
      set[i] === SKILL_RAMMING_TACTICS )
    ) {
      continue;
    }
    if(set[i] === SKILL_IMPROVED_SEA_MINE) {
      continue;
    }
    if(set[i] === SKILL_EVADE_MELEE_BATTLE) {
      continue;
    }

    result.push(set[i]);
  }

  return result;
};

// ========== penalty calculation section

const get_sail_penalty = (rank, diffpercent) => (
  get_penalty(rank, diffpercent, 1)
);
const get_wave_resistance_penalty = (rank, diffpercent) => (
  get_penalty(rank, diffpercent, 5)
);
const get_row_power_penalty = (rank, diffpercent) => (
  get_penalty(rank, diffpercent, 5)
);

const get_penalty = (rank, diffpercent, k) => {
  const d = Math.abs(diffpercent);
  let tmp1 = 0;
  let tmp2 = 0;
  if (diffpercent < 0) {
    tmp2 = parseInt(Math.floor(d));
    if (d > rank) {
      tmp1 = ((tmp2 - rank) * -5) / k;
    }
    return tmp1;
  }
  tmp2 = parseInt(Math.ceil(d));
  if ((d + 1) > rank) {
    tmp1 = ((tmp2 - rank) * -5) / k;
  }
  return tmp1;
}

export const calculate_penalty = (ship) => {
  const hold_base = ship.hold_capacity.base;
  const hold_range = ship.hold_capacity.base_ranged;

  const diffpercent = (1-(hold_range / hold_base)) * 100;
  const sail = get_sail_penalty(SHIP_BUILDING_RANK, diffpercent);
  const wave = get_wave_resistance_penalty(SHIP_BUILDING_RANK, diffpercent);
  const row  = get_row_power_penalty(SHIP_BUILDING_RANK, diffpercent);

  const hold_76  = parseInt(hold_base * 0.76);
  const hold_78  = parseInt(hold_base * 0.78);
  const hold_82  = parseInt(hold_base * 0.82);
  const hold_84  = parseInt(hold_base * 0.84);
  const hold_86  = parseInt(hold_base * 0.86);
  const hold_88  = parseInt(hold_base * 0.88);
  const hold_102 = parseInt(hold_base * 1.02);
  const hold_116 = parseInt(hold_base * 1.16);
  const hold_118 = parseInt(hold_base * 1.18);
  const hold_120 = parseInt(hold_base * 1.20);
  const hold_122 = parseInt(hold_base * 1.22);
  const hold_124 = parseInt(hold_base * 1.24);

  let turn = 0;
  switch (ship.turning_performance.base) {
    case 5:
      if(hold_range > hold_102) turn = -1;
    break;
    case 6:
      if(hold_range > hold_102) turn = -1;
    break;
    case 7:
      if(hold_range > hold_102) turn = -1;
      else if(hold_range > hold_76) turn = 0;
      else turn = 1;
    break;
    case 8:
      if(hold_range > hold_102) turn = -1;
      else if(hold_range > hold_78) turn = 0;
      else turn = 1;
    break;
    case 9:
      if(hold_range > hold_102) turn = -1;
      else if(hold_range > hold_82) turn = 0;
      else turn = 1;
    break;
    case 10:
      if(hold_range > hold_124) turn = -2;
      else if(hold_range > hold_102) turn = -1;
      else if(hold_range > hold_82) turn = 0;
      else turn = 1;
    break;
    case 11:
      if(hold_range > hold_122) turn = -2;
      else if(hold_range > hold_102) turn = -1;
      else if(hold_range > hold_84) turn = 0;
      else turn = 1;
    break;
    case 12:
      if(hold_range > hold_120) turn = -2;
      else if(hold_range > hold_102) turn = -1;
      else if(hold_range > hold_86) turn = 0;
      else turn = 1;
    break;
    case 13:
      if(hold_range > hold_118) turn = -2;
      else if(hold_range > hold_102) turn = -1;
      else if(hold_range > hold_86) turn = 0;
      else turn = 1;
    break;
    case 14:
      if(hold_range > hold_116) turn = -2;
      else if(hold_range > hold_102) turn = -1;
      else if(hold_range > hold_88) turn = 0;
      else if(hold_range > hold_76) turn = 1;
      else turn = 2;
    break;
    case 15:
      if(hold_range > hold_116) turn = -2;
      else if(hold_range > hold_102) turn = -1;
      else if(hold_range > hold_88) turn = 0;
      else if(hold_range > hold_78) turn = 1;
      else turn = 2;
    break;
    default:
      turn = 0;
    break;
  }

  return recalculate({...ship,
    vertical_sail: {
      ...ship.vertical_sail,
      penalty: sail,
    },
    horizontal_sail: {
      ...ship.horizontal_sail,
      penalty: sail,
    },
    row_power: {
      ...ship.row_power,
      penalty: row,
    },
    turning_performance: {
      ...ship.turning_performance,
      penalty: turn,
    },
    wave_resistance: {
      ...ship.wave_resistance,
      penalty: wave,
    },
  });
};

// ========== search

export const get_short_name = name => (
  name.split(' ').map(e => e[0]).join('').toLowerCase()
);

export const find_ships = (ships, req) => {
  const result = [];
  const keys = Object.keys(ships);

  for(let i = 0; i < keys.length; ++i) {
    const search = req.searchStr.toLowerCase();

    if((
        (ships[keys[i]]['levels']['advent'] < req.lvlAdvent.from ||
         ships[keys[i]]['levels']['advent'] > req.lvlAdvent.to) &&
        (ships[keys[i]]['levels']['trade'] < req.lvlTrade.from ||
         ships[keys[i]]['levels']['trade'] > req.lvlTrade.to) &&
        (ships[keys[i]]['levels']['battle'] < req.lvlBattle.from ||
         ships[keys[i]]['levels']['battle'] > req.lvlBattle.to)
      ) || (
        (ships[keys[i]]['purpose'] === SHIP_TYPE_ADVENTURE &&
         req.adventure === false) ||
        (ships[keys[i]]['purpose'] === SHIP_TYPE_TRADE &&
         req.trade === false) ||
        (ships[keys[i]]['purpose'] === SHIP_TYPE_BATTLE &&
         req.battle === false)
      ) || (
        (ships[keys[i]]['size'] === SHIP_SIZE_LIGHT &&
         req.light === false) ||
        (ships[keys[i]]['size'] === SHIP_SIZE_STANDARD &&
           req.standard === false) ||
        (ships[keys[i]]['size'] === SHIP_SIZE_HEAVY &&
           req.heavy === false)
      ) || (
        (ships[keys[i]]['is_nc'] === false &&
         req.nc === true)
      ) || (
        (ships[keys[i]]['sail'] === true &&
         req.sail === false) ||
        (ships[keys[i]]['row_power']['row'] === true &&
         req.row === false) ||
        (ships[keys[i]]['steam'] === true &&
         req.steam === false)
      ) || (
        req.searchStr !== '' &&
        ships[keys[i]].name.toLowerCase().match(search) === null &&
        get_short_name(ships[keys[i]].name).match(search) === null &&
        ships[keys[i]].skills.available.find(skill => (
          Skills[skill.id]['name'].toLowerCase().match(search) !== null
        )) === undefined &&
        ships[keys[i]].skills.available.find(skill => (
          get_short_name(Skills[skill.id]['name']).match(search) !== null
        )) === undefined
      )) {
      continue;
    }

    result.push(ships[keys[i]]);
  }

  return result;
};
