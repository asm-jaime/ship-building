import React from 'react';
import './ImproveLogGrade.css';

import { Store } from './Store';

import resSkills from './resSkills';
import resSkillsGrade from './resSkillsGrade';

import {
  GRADE_DEL,
  DISAGREE_SOUND,
  SOUND_HOVER,
} from './constants';

const ImproveLogGrade = (props) => {
  const { dispatch } = React.useContext(Store);
  return <div className='improve-log-grade'>
  {props.grades.map((step, num) => <div className='grade-step' key={num}>
      <div className='grade-step-num'>G{num}=>G{num+1}</div>
      <div className='grade-step-type'>{step.type}</div>
      <img alt={step.skill['grade']}
        title={resSkillsGrade[step.skill['grade']]['name']}
        src={resSkillsGrade[step.skill['grade']]['img']} />
      <img alt={step.skill['inherit']}
        title={resSkills[step.skill['inherit']]['name']}
        src={resSkills[step.skill['inherit']]['img']} />
      <button className='grade-del-button button-disagree'
        onMouseEnter={() => SOUND_HOVER.play()}
        onClick={() => {
          dispatch({type: GRADE_DEL, payload: num});
          DISAGREE_SOUND.play();
        }}
        title='remove grade'>
      </button>
    </div>)}
  </div>;
}

export default ImproveLogGrade;
