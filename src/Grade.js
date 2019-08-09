import React from 'react';
import './Grade.css';

import { Store } from './Store';


import resSkills from './resSkills';
import resSkillsGrade from './resSkillsGrade';

import {
  GRADE_ADD,
  SKILL_EMPTY,
  GRADE_LIMIT,
  GRADE_TYPES,
  GRADE_STAGES,
  MESSAGE_GRADE_LIMIT,
  STATUS_SHOW,
  STATUS_CLICK,
  GRADE_INHERIT,
  GRADE_SPEEDUP_I,
  GRADE_SPEEDUP_II,
  GRADE_SPEEDUP_III,
  GRADE_SKILL_SLOT_I,
  GRADE_SKILL_SLOT_II,
  GRADE_ROW_IMPROVE,
  GRADE_MELEE_BATTLE_SHIP_REFIT,
  GRADE_ARMOURED_SHIP_REFIT,
  SKILL_ROWING_ASSISTANCE,
  SKILL_IMPROVED_RAM,
  SKILL_SPECIAL_RAM,
  SKILL_RAMMING_TACTICS,
  SKILL_IMPROVED_SEA_MINE,
  SKILL_EVADE_MELEE_BATTLE,
  SKILL_MELEE_BATTLE_SHIP_REFIT,
  SKILL_ARMOURED_SHIP_REFIT,
} from './constants';

const SkillsShow = (props) => {
  const [show, setShow] = React.useState(0);

  const getSkillImg = () => {
    if(props.skill === SKILL_EMPTY) {
      return <img className='icon-skill'
        src={SKILL_EMPTY} alt={SKILL_EMPTY}
        onClick={() => setShow(show => show? 0 : 1)}
      />
    } else {
      return <img className='icon-skill'
      src={props.resource[props.skill]['img']} alt={props.skill}
      onClick={() => setShow(show => show? 0 : 1)}
    />
    }
  };
  return <div className='skills-show'
         style={{pointerEvents: STATUS_CLICK[props.status]}}>
    {getSkillImg()}
    <div className='select-skills'style={{display: STATUS_SHOW[show]}}>{
    props.data.map((id, i) => (
      <img
        className='select-skill'
        key={i}
        src={props.resource[id]['img']}
        title={props.resource[id]['name']} alt={id}
        onClick={() => {
          setShow(0);
          props.set(id);
        }}
      ></img>)
    )
  }</div>
  </div>
}

const getGradeSkills = (ship, set) => {
  const result = [];

  for(let i = 0; i < set.length; ++i) {
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
}

const getShipSkills = (ship, set) => {
  const result = [];

  for(let i = 0; i < set.length; ++i) {
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
}

const Grade = (props) => {
  const {state, dispatch } = React.useContext(Store);
  const [gradeType, setGradeType] = React.useState('Generic Ship');

  const [skills, setSkills] = React.useState(
    {grade: SKILL_EMPTY, inherit: SKILL_EMPTY}
  );

  const skillsData = getShipSkills(
    state.ship,
    Object.keys(resSkills)
    .filter(key => resSkills[key]['optional']).map(key => key)
  );
  const skillsGradeData = getGradeSkills(
    state.ship, Object.keys(resSkillsGrade).map(key => key)
  );

  if(state.grades.length > GRADE_LIMIT - 1) {
    return <div className='grade'>{MESSAGE_GRADE_LIMIT}</div>;
  }

  return (
    <div className='grade'>
    <div className='grade-chose-group'>
      <div className='grade-first-group'>
        <div>G{state.grades.length}=>G{state.grades.length + 1}</div>
        <select className='select-grade-type'
        value={gradeType}
        onChange={event => setGradeType(event.target.value)}>
          {GRADE_TYPES.map((e, i) =>
            <option className='select-grade-type' key={i} value={e}>{e}</option>)}
        </select>
      </div>
      <div className='skills-frame'>
        <SkillsShow skill={skills.grade}
        data={skillsGradeData} resource={resSkillsGrade}
        status={GRADE_STAGES[state.grades.length]}
        set={id => setSkills(ids => {
          if(id === GRADE_MELEE_BATTLE_SHIP_REFIT) {
            return {grade: id, inherit: SKILL_MELEE_BATTLE_SHIP_REFIT};
          }
          if(id === GRADE_ARMOURED_SHIP_REFIT) {
            return {grade: id, inherit: SKILL_ARMOURED_SHIP_REFIT};
          }
          return {grade: id, inherit: SKILL_EMPTY};
        })}/>
        <SkillsShow skill={skills.inherit}
        data={skillsData} resource={resSkills}
        status={skills.grade === GRADE_INHERIT? 1 : 0}
        set={id => setSkills(ids => ({...ids, inherit: id}))}/>
      </div>
    </div>
    <button onClick={() => {
      dispatch({type: GRADE_ADD, payload: {type: gradeType, skill: skills}});
      setSkills({grade: SKILL_EMPTY, inherit: SKILL_EMPTY});
    }}>set</button>
    </div>
  )
}

export default Grade;
