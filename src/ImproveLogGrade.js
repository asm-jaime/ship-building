import React from 'react';
import './ImproveLogGrade.css';

import { Store } from './Store';

import { GRADE_DEL } from './constants';

const ImproveLogGrade = (props) => {
  const { dispatch } = React.useContext(Store);
  return (
    <div className='improve-log-grade'>
    { props.grades.map((step, num) => {
      const inherited = Object.hasOwnProperty.call(step.skill, 'inherit')
        ? <img src={`./${step.skill['inherit']}.png`} alt={step.skill['inherit']}/>
        : <img src='./skill_epmty.png' alt='empty'/>
      const skill = (step.skill['id'])
        ? <img src={`./${step.skill['id']}.png`} alt={step.skill['id']}/>
        : <img src='./skill_epmty.png' alt='empty'/>

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
