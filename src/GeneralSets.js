import React from 'react';
import './GeneralSets.css';

import { Store } from './Store';
import {
  get_available_optional_skills,
  get_available_original_skills,
} from './StoreResolve';

import {
  SKILL_ORIGINAL_SET,
  SKILL_OPTIONAL_SET,
  SKILL_EMPTY,
} from './constants';

import resSkills from './resSkills';

import Tabs from './Tabs';
import SkillsShow from './SkillsShow';
import Skill from './Skill';
import Panel from './Panel';
import ComponentTitle from './ComponentTitle';

const GeneralSets = () => {
  const { state, dispatch } = React.useContext(Store);
  const [skillOptional, setSkillOptional] = React.useState(SKILL_EMPTY);
  const [skillOriginal, setSkillOriginal] = React.useState(SKILL_EMPTY);

  const skillsOptionalData = get_available_optional_skills(state.ship);
  const skillsOriginalData = get_available_original_skills(
    state.ship, resSkills
  );

  return <div className='general-sets'>
    <ComponentTitle name='set a panel/hull/skill'/>
    <Tabs>
      <Panel name='panel'/>
      <Skill skill={skillOptional} name='optional'
        description={resSkills[skillOptional]['name']}
        set={skill =>
          dispatch({ type: SKILL_OPTIONAL_SET, payload: skill })
      }>
        <SkillsShow skill={skillOptional} status={1}
          data={skillsOptionalData} resource={resSkills}
          set={id => setSkillOptional(id)}/>
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
  </div>;
}

export default GeneralSets;
