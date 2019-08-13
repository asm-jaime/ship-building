import React from 'react';
import './Grade.css';

import { Store } from './Store';
import {
  get_available_grade_skills,
  get_inheritable_skills
} from './StoreResolve';

import SkillsShow from './SkillsShow';

import resSkills from './resSkills';
import resSkillsGrade from './resSkillsGrade';

import {
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
  const [gradeType, setGradeType] = React.useState('Generic Ship');

  const [skills, setSkills] = React.useState(
    {grade: SKILL_EMPTY, inherit: SKILL_EMPTY}
  );

  const skillsData = get_inheritable_skills(
    state.ship, resSkills
  );
  const skillsGradeData = get_available_grade_skills(
    state.ship, resSkillsGrade
  );

  if(state.grades.length > GRADE_LIMIT - 1) {
    return <div className='grade'>{MESSAGE_GRADE_LIMIT}</div>;
  }

  return (
    <div className='grade'>
    <div className='grade-chose-group'>
      <div className='grade-first-group'>
        <select className='select-grade-type' title={GRADE_SELECT_INFO}
          value={gradeType}
          onMouseDown={() => SOUND_CLICK.play()}
          onMouseUp={() => SOUND_CLICK.play()}
          onChange={event => {
            setGradeType(event.target.value);
            SOUND_CLICK.play();
          }}>
          {GRADE_TYPES.map((e, i) =>
            <option className='select-grade-type' key={i} value={e}>{e}</option>)}
        </select>
      </div>
      <div className='grade-bottom-group'>
      <div>G{state.grades.length}=>G{state.grades.length + 1}</div>
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
    </div>
    <button className='grade-add-button button-agree' title={GRADE_ADD_BUTTON_INFO}
      onMouseEnter={() => SOUND_HOVER.play()}
      onClick={() => {
        dispatch({type: GRADE_ADD, payload: {type: gradeType, skill: skills}});
        setSkills({grade: SKILL_EMPTY, inherit: SKILL_EMPTY});
        AGREE_SOUND.play();
    }}></button>
    </div>
  )
}

export default Grade;
