import React from 'react';
import './Grade.css';

import { Store } from './Store';
import {
  get_available_grade_skills,
  get_inheritable_skills
} from './StoreResolve';

import SkillsShow from './SkillsShow';
import ComponentTitle from './ComponentTitle';

import resSkills from './resSkills';
import resSkillsGrade from './resSkillsGrade';

import {
  GRADE_STEP_SET_TYPE,
  GRADE_STEP_SET_SKILLS,
  GRADE_RESET,
  GRADE_ADD,
  SKILL_EMPTY,
  GRADE_LIMIT,
  GRADE_TYPES,
  GRADE_STAGES,
  MESSAGE_GRADE_LIMIT,
  GRADE_INHERIT,
  GRADE_MELEE_BATTLE_SHIP_REFIT,
  GRADE_ARMOURED_SHIP_REFIT,
  SKILL_MELEE_BATTLE_SHIP_REFIT,
  SKILL_ARMOURED_SHIP_REFIT,
  AGREE_SOUND,
  SOUND_HOVER,
  SOUND_CLICK,
  GRADE_SELECT_INFO,
  GRADE_ADD_BUTTON_INFO,
} from './constants';

const Grade = (props) => {
  const {state, dispatch } = React.useContext(Store);

  const skillsData = get_inheritable_skills(
    state.ship, resSkills
  );
  const skillsGradeData = get_available_grade_skills(
    state.ship, resSkillsGrade
  );

  if(state.grades.length > GRADE_LIMIT - 1) {
    return <div className='grade'>{MESSAGE_GRADE_LIMIT}</div>;
  }

  return <div className='grade'>
    <ComponentTitle name='add grade'/>
    <div className='grade-group'>
    <div className='grade-chose-group'>
      <div className='grade-first-group'>
        <select className='select-grade-type' title={GRADE_SELECT_INFO}
          value={state.grade_step.type}
          onMouseDown={() => SOUND_CLICK.play()}
          onMouseUp={() => SOUND_CLICK.play()}
          onChange={event => {
            dispatch({type: GRADE_STEP_SET_TYPE, payload: event.target.value});
            SOUND_CLICK.play();
          }}>
          {GRADE_TYPES.map((e, i) =>
            <option className='select-grade-type' key={i} value={e}>{e}</option>)}
        </select>
      </div>
      <div className='grade-bottom-group'>
      <div>G{state.grades.length}=>G{state.grades.length + 1}</div>
      <div className='skills-frame'>
        <SkillsShow skill={state.grade_step.skills.grade}
          data={skillsGradeData} resource={resSkillsGrade}
          status={GRADE_STAGES[state.grades.length]}
          set={id => {
            const payload = (() => {
              if(id === GRADE_MELEE_BATTLE_SHIP_REFIT) {
                return {grade: id, inherit: SKILL_MELEE_BATTLE_SHIP_REFIT};
              }
              if(id === GRADE_ARMOURED_SHIP_REFIT) {
                return {grade: id, inherit: SKILL_ARMOURED_SHIP_REFIT};
              }
              return {grade: id, inherit: SKILL_EMPTY};
            })();
            dispatch({ type: GRADE_STEP_SET_SKILLS, payload });
          }
        }/>
        <SkillsShow skill={state.grade_step.skills.inherit}
          data={skillsData} resource={resSkills}
          status={state.grade_step.skills.grade === GRADE_INHERIT? 1 : 0}
          set={id => dispatch({
            type: GRADE_STEP_SET_SKILLS,
            payload: {...state.grade_step.skills, inherit: id}
          })}/>
      </div>
      </div>
    </div>
    <button className='grade-add-button button-agree' title={GRADE_ADD_BUTTON_INFO}
      onMouseEnter={() => SOUND_HOVER.play()}
      onClick={() => {
        dispatch({type: GRADE_ADD, payload: {
          type: state.grade_step.type, skills: {...state.grade_step.skills}
        }});
        dispatch({type: GRADE_RESET});
        AGREE_SOUND.play();
    }}></button>
    </div>
  </div>;
}

export default Grade;
