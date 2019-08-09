import React from 'react';
import './Skill.css';

import skills from './resSkills.js';
import { SKILL_EMPTY } from './constants';

const Skill = (props) => {
  const [showSkills, setShowSkills] = React.useState('none');
  const [skill, setSkill] = React.useState(SKILL_EMPTY);

  const toggler = { 'grid': 'none', 'none': 'grid' };
  const statusButton = { 'grid': 'hide', 'none': 'show' };

  const skillName = () => {
    if(skill === SKILL_EMPTY) {
      return 'Empty Skill';
    } else {
      return skills[skill]['name'];
    }
  };

  return (
    <div className={props.name}>
      <div className='panel'>
        <div className='panel-left'>
          <button className='panel-show-button'
          onClick={() => setShowSkills(
            showSkills => toggler[showSkills]
          )}>{statusButton[showSkills]}</button>
          <div className='skill-name'>{skillName()}</div>
        </div>
        <div className='panel-right'>
          <div className='skill-frame'>
            <img className='icon-skill' src={skill} alt={skill}/>
          </div>
          <button onClick={() => props.set(skill)}>set</button>
        </div>
      </div>

      <div>
        <div className='select' style={{display: showSkills}}>
        {props.skills.map(skill => (
          <img src={`./${skill.id}.png`} className='icon-skill'
            key={skill.id} alt={skill.id} onClick={
            () => {
              setSkill(skill.id);
              setShowSkills(showSkills => toggler[showSkills]);
            }
          }></img>))
        }
        </div>
      </div>

    </div>
  )
}

export default Skill;
