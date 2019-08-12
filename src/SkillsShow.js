import React from 'react';
import './SkillsShow.css';

import {
  SKILL_EMPTY,
  STATUS_SHOW,
  STATUS_CLICK,
} from './constants';

const SkillsShow = (props) => {
  const [show, setShow] = React.useState(0);

  const getSkillImg = () => {
    if(props.skill === SKILL_EMPTY) {
      return <img className='icon-skill'
        src={SKILL_EMPTY} alt={SKILL_EMPTY}
        onClick={() => setShow(show => show? 0 : 1)}
      />
    } else {
      return <img className='icon-skill'
      src={props.resource[props.skill]['img']} alt={props.skill}
      onClick={() => setShow(show => show? 0 : 1)}
    />
    }
  };
  return <div className='skills-show'
         style={{pointerEvents: STATUS_CLICK[props.status]}}>
    {getSkillImg()}
    <div className='select-skills' style={{display: STATUS_SHOW[show]}}>{
    props.data.map((id, i) => <img
      className='select-skill'
      key={i}
      src={props.resource[id]['img']}
      title={props.resource[id]['name']} alt={id}
      onClick={() => {
        setShow(0);
        props.set(id);
      }}
      />
    )
  }</div>
  </div>;
}

export default SkillsShow;
