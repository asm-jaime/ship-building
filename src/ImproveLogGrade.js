import React from 'react';
import './ImproveLogGrade.css';

import { Store } from './Store';

import { GRADE_DEL, SKILL_EMPTY } from './constants';

const ImproveLogGrade = (props) => {
  const { dispatch } = React.useContext(Store);
  return (
    <div className='improve-log-grade'>
    { props.grades.map((step, num) => {
      const inherited = step.skill.inherit !== SKILL_EMPTY
        ? <img src={`./${step.skill['inherit']}.png`} alt={step.skill['inherit']}/>
        : <img src={SKILL_EMPTY} alt='empty'/>
      const skill = step.skill['grade'] !== SKILL_EMPTY
        ? <img src={`./${step.skill['grade']}.png`} alt={step.skill['grade']}/>
        : <img src={SKILL_EMPTY} alt='empty'/>

      return (
        <div className='grade-step' key={num}>
          <div className='grade-step-num'>G{num}=>G{num+1}</div>
          <div className='grade-step-type'>{step.type}</div>
          {skill}
          {inherited}
          <button className='grade-del-button'
            onClick={() => dispatch({type: GRADE_DEL, payload: num})}
            title='remove grade'>
            <img className='grade-del-icon' src='./delete_grade_step.png' alt='del'/>
          </button>
        </div>
      );
      })
    }
    </div>
  );
}

export default ImproveLogGrade;
