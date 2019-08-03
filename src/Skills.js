import React from 'react';
import './Skills.css';

import { Store } from './Store';
import {
  SKILL_ORIGINAL_SET, SKILL_OPTIONAL_SET,
} from './constants';

import skills from './resSkills.js';

import Tabs from './Tabs';

import Skill from './Skill';

const Skills = (props) => {
  const { state, dispatch } = React.useContext(Store);

  const dispatchOptional = (skill) => {
    dispatch({ type: SKILL_OPTIONAL_SET, payload: skill });
  };
  const dispatchOriginal = (skill) => {
    dispatch({ type: SKILL_ORIGINAL_SET, payload: skill });
  };

  return (
    <div className='skills'>
    <Tabs>
      <Skill className='original' name='original' skills={
        Object.keys(skills)
          .filter(key => skills[key]['original'])
          .map(key => skills[key])
      } set={dispatchOriginal}
      />
      <Skill name='optional' skills={
        state.ship.skills.available
        .filter(skill => {
          const set = state.ship.skills.optional.set;
          for(let i = 0; i < set.length; ++i) {
            if(set[i]['id'] === skill.id) {
              return false;
            }
          }
          return true;
        })
        .map(skill => skills[skill.id])
      } set={dispatchOptional}
      />
    </Tabs>
    </div>
  )
}

export default Skills;
