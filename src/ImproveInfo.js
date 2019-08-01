import React from 'react';
import './ImproveInfo.css';
import { Store } from './Store';
import {
  SHIP_BUILDING_RANK,
  SHIP_CABINE_BASE_RANGE_SET,
  SHIP_CANNON_BASE_RANGE_SET,
  SHIP_HOLD_BASE_RANGE_SET,
} from './constants';

import SKILLS_GRADE from './resSkillsGrade';
import SKILLS from './resSkills';

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
}

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
}

const getCabinRanges = (cabin, required) => {
  const req = parseInt(required * 1.2);
  const cab = parseInt(cabin * 0.5);

  const min = (req < cab) ? cab : req;
  const max = parseInt(cabin * 1.5);

  return [min, max];
}

const getCannonRanges = (cannons) => {
  return [parseInt(cannons * 0.5), parseInt(cannons * 1.5)];
}

const getHoldRanges = (hold) => {
  const smax = SHIP_BUILDING_RANK + 5;
  const smin = - (SHIP_BUILDING_RANK + 5);
  const max_hold = parseInt(hold * (1 + smax / 100));
  const min_hold = parseInt(hold * (1 + smin / 100));

  const max_safe = get_max_safe_hold(hold);
  const min_safe = get_min_safe_hold(hold);

  return [min_hold, min_safe, max_safe, max_hold];
}

const InfoPerform = (props) => {
  return (
    <div className='info-performance-state' title={props.name}>
    <img src={`./i_${props.performance}.png`} alt={props.name}
    className='icon'></img> <span>{props.result}</span>
    </div>
  )
}

const InfoRanged = (props) => {
  return (
    <div className='info-performance-progress' title={props.name}>
      <div className='info-performance-state'>
      <img src={`./i_${props.performance}.png`} alt={props.name}
      className='icon'></img> <span>{props.result}</span>
      {props.children}
      </div> <div className='info-ship-ranged-progress'></div>
    </div>
  )
};

const ImproveInfo = (props) => {
  const { state, dispatch } = React.useContext(Store);
  const ship = state.ship;

  return (
    <div className='improve-info'>
    <div className='info-grade'>
    <span>Grade: {ship.grade.rank}({ship.grade.type})</span>
    </div>
    <div className='info-grade-skills'>
    {ship.grade.skills.map(skill => (
      <img key={skill} src={`./${skill}.png`}
        title={SKILLS_GRADE[skill].name} alt={skill}
      ></img>
    ))}
    </div>
    <div className='info-performance'>
      <InfoPerform name='vertical sail' performance='vertical_sail'
        result={ship.vertical_sail.base + ship.vertical_sail.result} />
      <InfoPerform name='horizontal sail' performance='horizontal_sail'
        result={ship.horizontal_sail.base + ship.horizontal_sail.result} />
      <InfoPerform name='row power' performance='row_power'
        result={ship.row_power.base + ship.row_power.result} />
      <InfoPerform name='turning performance' performance='turning_performance'
        result={ship.turning_performance.base + ship.turning_performance.result} />
      <InfoPerform name='wave resistance' performance='wave_resistance'
        result={ship.wave_resistance.base + ship.wave_resistance.result} />
      <InfoPerform name='armouring value' performance='armouring_value'
        result={ship.armouring_value.base + ship.armouring_value.result} />
    </div>
    <div className='info-performance-linear'>
      <div className='info-performance-progress' title='durability'>
      <div className='info-performance-state'>
        <img src='./i_durability.png' alt='durability'
        ></img> <span>{ship.durability.base + ship.durability.result}</span>
      </div> <div className='info-durability-progress'></div>
      </div>
      <div className='info-performance-progress' title='ship handling'>
      <div className='info-performance-state'>
      <img src='./i_ship_handling_proficiency.png' alt='ship handling'
      ></img>
      <span>
        { ship.ship_handling_proficiency.result }
      </span>
      </div> <div className='info-ship-handling-progress'></div>
      </div>
    </div>
    <div className='info-skills-set'>
      <img className='optional-skill-icon'
        src='./i_skill_optional.png' alt='optional'
        title='optional skills'
      ></img>
      <div>
      {ship.improvement.result}/{ship.improvement.limit.current}
      </div>
      {ship.skills.optional.set.map(skill => (
        <img key={skill.id} src={`./${skill.id}.png`} alt={skill.id}
          title={SKILLS[skill.id].name}
        ></img>))}
      {
        ship.skills.inherit === '' ||
        <img src={`./${ship.skills.inherit}.png`} alt={ship.skills.inherit}></img>
      }
      <img className='original-skill-icon'
        src='./i_skill_original.png' alt='original'
        title='original skills'
      ></img>
      {(ship.skills.original)?
        <img src={`./${ship.skills.original}.png`} alt='nothing'></img>:<div></div>
      }
    </div>
    <div className='info-ranged-state'>
      <InfoRanged name='cabin capacity' performance='cabine_capacity'
      result={ship.cabine_capacity.base_ranged + ship.cabine_capacity.result}>
        { getCabinRanges(
            ship.cabine_capacity.base, ship.cabine_capacity.required
          ).map((elem, i) => (<button key={i} onClick={() => dispatch({
            type: SHIP_CABINE_BASE_RANGE_SET,
            payload: elem,
          })} className='range-button'>{elem}</button>))
        }
      </InfoRanged>
      <InfoRanged name='cannon capacity' performance='cannon_chambers_capacity'
      result={ship.cannon_chambers_capacity.base_ranged + ship.cannon_chambers_capacity.result}>
        { getCannonRanges(
            ship.cannon_chambers_capacity.base
          ).map((elem, i) => (<button key={i} onClick={() => dispatch({
            type: SHIP_CANNON_BASE_RANGE_SET,
            payload: elem,
          })} className='range-button'>{elem}</button>))
        }
      </InfoRanged>
      <InfoRanged name='hold capacity' performance='hold_capacity'
      result={ship.cargo.result}>
        { getHoldRanges(
            ship.hold_capacity.base
          ).map((elem, i) => (<button key={i} onClick={() => dispatch({
            type: SHIP_HOLD_BASE_RANGE_SET,
            payload: elem,
          })} className='range-button'>{elem}</button>))
        }
      </InfoRanged>
    </div>
    </div>
  )
};

export default ImproveInfo;
