import {
  IMPROVEABLE_PROPERTIES,
  GRADE_LIMITS,
  GRADE_BONUS,
  GRADE_IMPROVE,
  GRADE_IMPROVES,
  GRADE_INHERIT,
} from './constants';

import Sails from './resSails';
import Gunports from './resGunports';
import Armaments from './resArmaments';


// resolver section

const durability = (durability) => ({
  ...durability,
  result:  get_improve(
    durability['improve_limit']['current'],
    durability.material + durability.grade + durability.improve
  )
});

const vertical = (vertical) => ({
  ...vertical,
  result: get_improve(
    vertical['improve_limit']['current'],
    vertical.material + vertical.grade + vertical.penalty + vertical.improve
  )
});

const horizontal = (horizontal) => ({
  ...horizontal,
  result: get_improve(
    horizontal['improve_limit']['current'],
    horizontal.material + horizontal.grade + horizontal.penalty + horizontal.improve
  ),
});

const row = (row) => ({
  ...row,
  result: get_improve(
    row['improve_limit']['current'],
    row.grade + row.penalty + row.improve
  )
});

const turning = (turning) => ({
  ...turning,
  result: get_improve(
    turning['improve_limit']['current'],
    turning.grade + turning.penalty + turning.improve
  )
});

const wave = (wave) => ({
  ...wave,
  result: get_improve(
    wave['improve_limit']['current'],
    wave.grade + wave.penalty + wave.improve
  )
});

const armouring = (armouring) => ({
  ...armouring,
  result: get_improve(
    armouring['improve_limit']['current'],
    armouring.grade + armouring.improve
  )
});

const cabine = (cabine) => ({
  ...cabine,
  result: get_improve(
    cabine['improve_limit']['current'],
    cabine.grade + cabine.improve
  )
});

const cannon = (cannon) => ({
  ...cannon,
  result: get_improve(
    cannon['improve_limit']['current'],
    cannon.grade + cannon.improve
  )
});

const hold = (hold) => ({
  ...hold,
  result: get_improve(
    hold['improve_limit']['current'],
    hold.grade + hold.improve
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
}

// improvement section

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
    result[property] = resolve[property](
      {...ship[property], improve: iaverages[i]}
    );
  }
  return {...ship, ...result};
}

// grade section

const recalculate = (ship) => {
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
}

export const get_grade = (ship, grades) => {
  const result = [];
  let inherit = '';
  for(let i = 0; i < grades.length; ++i) {
    if(grades[i]['skill']['id']) {
      result.push(grades[i]['skill']['id']);
    }
    if(grades[i]['skill']['id'] === GRADE_INHERIT) {
      inherit = grades[i]['inherit'];
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
      inherited: inherit,
    },
    grade,
  };
}

export const get_grading = (ship, grade) => {
  const ship_handling = {
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

  return recalculate({...ship, ship_handling, ...graded});
}
