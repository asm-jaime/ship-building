import React from 'react';
import './SkillsShow.css';

import {
  STATUS_SHOW,
  STATUS_CLICK,
  SOUND_CLICK,
} from './constants';

const SkillsShow = (props) => {
  const [show, setShow] = React.useState(0);

  return <div className='skills-show'
         style={{pointerEvents: STATUS_CLICK[props.status]}}>
    <img className='icon-skill'
      src={props.resource[props.skill]['img']} alt={props.skill}
      onClick={() => {
        setShow(show => show? 0 : 1);
        SOUND_CLICK.play();
      }}/>
    <div className='select-skills' style={{display: STATUS_SHOW[show]}}>{
    props.data.map((id, i) => <img
      className='select-skill'
      key={i}
      src={props.resource[id]['img']}
      title={props.resource[id]['name']} alt={id}
      onClick={() => {
        setShow(0);
        props.set(id);
        SOUND_CLICK.play();
      }}
      />
    )
  }</div>
  </div>;
}

export default SkillsShow;
