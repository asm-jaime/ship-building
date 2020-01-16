import React from 'react';
import './GeneralSets.css';

import { Store } from './Store';
import {
  get_available_optional_skills,
  get_available_original_skills,
} from './StoreResolve';

import {
  ORIGINAL_STEP_SET,
  OPTIONAL_STEP_SET,
  SKILL_ORIGINAL_SET,
  SKILL_OPTIONAL_SET,
} from './constants';

import resSkills from './resSkills';

import Tabs from './Tabs';
import SkillsShow from './SkillsShow';
import Skill from './Skill';
import Panel from './Panel';
import ComponentTitle from './ComponentTitle';

const GeneralSets = () => {
  const { state, dispatch } = React.useContext(Store);

  const skillsOptionalData = get_available_optional_skills(state.ship);
  const skillsOriginalData = get_available_original_skills(
    state.ship, resSkills
  );

  return <div className='general-sets'>
    <ComponentTitle name='set a panel/hull/skill'/>
    <Tabs>
      <Panel name='panel'/>
      <Skill skill={state.optional_step} name='optional'
        description={resSkills[state.optional_step]['name']}
        set={skill =>
          dispatch({ type: SKILL_OPTIONAL_SET, payload: skill })
      }>
        <SkillsShow skill={state.optional_step} status={1}
          data={skillsOptionalData} resource={resSkills}
          set={id => dispatch({type: OPTIONAL_STEP_SET, payload: id})}/>
      </Skill>
      <Skill skill={state.original_step} name='original'
        description={resSkills[state.original_step]['name']}
        set={(skill) =>
          dispatch({ type: SKILL_ORIGINAL_SET, payload: skill })
      }>
        <SkillsShow skill={state.original_step} status={1}
          data={skillsOriginalData} resource={resSkills}
          set={id => dispatch({type: ORIGINAL_STEP_SET, payload: id})}/>
      </Skill>
    </Tabs>
  </div>;
}

export default GeneralSets;
