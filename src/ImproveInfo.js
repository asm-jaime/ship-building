import React from 'react';
import './ImproveInfo.css';
import { Store } from './Store';
import {
  get_hold_ranges, get_cabin_ranges, get_cannon_ranges
} from './StoreResolve';

import {
  SHIP_CABINE_BASE_RANGE_SET,
  SHIP_CANNON_BASE_RANGE_SET,
  SHIP_HOLD_BASE_RANGE_SET,
  SHIP_STAT_ICONS_UW2,
  IMPROVEMENTS_INFO,
} from './constants';

import resSkillsGrade from './resSkillsGrade';
import resSkills from './resSkills';

const InfoPerform = (props) => {
  return (
    <div className='info-performance-state' title={props.name}>
      <img className='icon-stat' alt={props.name}
      src={SHIP_STAT_ICONS_UW2[props.performance]}
      ></img> <span className='info-ship-number'>{props.result}</span>
    </div>
  );
}

const InfoRanged = (props) => {
  return (
    <div className='info-performance-progress' title={props.name}>
      <div className='info-performance-state'>
      <img className='icon-range' alt={props.name}
      src={SHIP_STAT_ICONS_UW2[props.performance]}
      ></img> <span className='info-ship-number'>{props.result}</span>
      {props.children}
      </div> <div className='info-ship-ranged-progress'></div>
    </div>
  );
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
        title={resSkillsGrade[skill].name} alt={skill}
      ></img>
    ))}
    </div>
    <div className='info-performance'>
      <InfoPerform name='vertical sail' performance='vertical_sail'
        result={ ship.vertical_sail.base +
          ship.vertical_sail.material +
          ship.vertical_sail.result } />
      <InfoPerform name='horizontal sail' performance='horizontal_sail'
        result={ship.horizontal_sail.base +
          ship.horizontal_sail.material +
          ship.horizontal_sail.result } />
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
        ></img> <span className='info-ship-number'>{ ship.durability.base +
          ship.durability.material +
          ship.durability.result }</span>
      </div> <div className='info-durability-progress'></div>
      </div>
      <div className='info-performance-progress' title='ship handling'>
      <div className='info-performance-state'>
      <img src='./i_ship_handling_proficiency.png' alt='ship handling'
      ></img>
      <span className='info-ship-number'>
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
      <div className='info-ship-number' title={IMPROVEMENTS_INFO}>
      {state.improvements.length}/{ship.improvement.limit.current}
      </div>
      {ship.skills.optional.set.map(skill => (
        <img key={skill.id} src={resSkills[skill.id]['img']} alt={skill.id}
          title={resSkills[skill.id]['name']}
        />))}
      {ship.skills.inherit.map(skill => <img
        key={skill} src={resSkills[skill]['img']} alt={skill}
        title={resSkills[skill]['name']}/>
      )}
      <img className='original-skill-icon'
        src='./i_skill_original.png' alt='original'
        title='original skill'
      />
      <img
        src={resSkills[ship.skills.original]['img']} alt='empty'
        title={resSkills[ship.skills.original]['name']}
      />
    </div>
    <div className='info-ranged-state'>
      <InfoRanged name='cabin capacity' performance='cabine_capacity'
      result={ship.cabine_capacity.base_ranged + ship.cabine_capacity.result}>
        { get_cabin_ranges(
            ship.cabine_capacity.base, ship.cabine_capacity.required
          ).map((elem, i) => (<button key={i} onClick={() => dispatch({
            type: SHIP_CABINE_BASE_RANGE_SET,
            payload: elem,
          })} className='range-button'>{elem}</button>))
        }
      </InfoRanged>
      <InfoRanged name='cannon capacity' performance='cannon_chambers_capacity'
      result={ ship.cannon_chambers_capacity.base_ranged +
               ship.cannon_chambers_capacity.result}
      >
        {get_cannon_ranges(ship.cannon_chambers_capacity.base)
          .map((elem, i) => <button key={i} onClick={() => dispatch({
            type: SHIP_CANNON_BASE_RANGE_SET,
            payload: elem,
          })} className='range-button'>{elem}</button>)}
      </InfoRanged>
      <InfoRanged name='hold capacity' performance='hold_capacity'
      result={ship.cargo.result}>
        {get_hold_ranges(ship.hold_capacity.base)
          .map((elem, i) => <button key={i} onClick={() => dispatch({
            type: SHIP_HOLD_BASE_RANGE_SET,
            payload: elem,
          })} className='range-button'>{elem}</button>)}
      </InfoRanged>
    </div>
    </div>
  )
};

export default ImproveInfo;
