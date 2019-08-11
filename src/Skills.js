import React from 'react';
import './Skills.css';

import { Store } from './Store';
import {
  SKILL_ORIGINAL_SET,
  SKILL_OPTIONAL_SET,
  SKILL_EMPTY,
  SKILL_ROWING_ASSISTANCE,
  SKILL_IMPROVED_RAM,
  SKILL_SPECIAL_RAM,
  SKILL_RAMMING_TACTICS,
} from './constants';

import resSkills from './resSkills';

import Tabs from './Tabs';
import SkillsShow from './SkillsShow';
import Skill from './Skill';
import Panel from './Panel';

const getAvailableOptionalSkills = (ship, set) => {
  const result = [];
  for(let i = 0; i < set.length; ++i) {
    if(ship.skills.optional.set.find(e => set[i]['id'] === e['id'])) {
      continue;
    }
    if(ship.skills.inherit.find(e => set[i]['id'] === e)) {
      continue;
    }
    if(set[i]['id'] === ship.skills.original) {
      continue;
    }
    result.push(set[i]['id']);
  }
  return result;
}

const getAvailableOriginalSkills = (ship, set) => {
  const result = [];
  for(let i = 0; i < set.length; ++i) {
    if(ship.row_power.row === false && (
      set[i] === SKILL_ROWING_ASSISTANCE ||
      set[i] === SKILL_IMPROVED_RAM ||
      set[i] === SKILL_SPECIAL_RAM ||
      set[i] === SKILL_RAMMING_TACTICS )
    ) {
      continue;
    }
    if(resSkills[set[i]]['original'] === false) {
      continue;
    }
    if(ship.skills.optional.set.find(e => set[i] === e['id'])) {
      continue;
    }
    if(ship.skills.inherit.find(e => set[i] === e['id'])) {
      continue;
    }
    if(set[i] === ship.skills.original) {
      continue;
    }
    result.push(set[i]);
  }
  return result;
}


const Skills = (props) => {
  const { state, dispatch } = React.useContext(Store);
  const [skillOptional, setSkillOptional] = React.useState(SKILL_EMPTY);
  const [skillOriginal, setSkillOriginal] = React.useState(SKILL_EMPTY);

  const skillsOptionalData = getAvailableOptionalSkills(
    state.ship,
    state.ship.skills.available
  );
  const skillsOriginalData = getAvailableOriginalSkills(
    state.ship,
    Object.keys(resSkills)
  );

  return (
    <div className='skills'>
    <div value={state.ship.skills.inherit}></div>
    <Tabs>
    <Panel name='paneling'/>
    <Skill skill={skillOptional} name='optional'
    description={resSkills[skillOptional]['name']}
    set={(skill) =>
      dispatch({ type: SKILL_OPTIONAL_SET, payload: skill })
    }>
      <SkillsShow skill={skillOptional} status={1}
        data={skillsOptionalData} resource={resSkills}
        set={id => setSkillOptional(id)}
      />
    </Skill>
    <Skill skill={skillOriginal} name='original'
    description={resSkills[skillOriginal]['name']}
    set={(skill) =>
      dispatch({ type: SKILL_ORIGINAL_SET, payload: skill })
    }>
      <SkillsShow skill={skillOriginal} status={1}
        data={skillsOriginalData} resource={resSkills}
        set={id => setSkillOriginal(id)}/>
    </Skill>
    </Tabs>
    </div>
  )
}

export default Skills;
