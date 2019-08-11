import React from 'react';
import './Skill.css';

import {
  AGREE_SOUND,
  SOUND_HOVER,
} from './constants';

const Skill = (props) => {
  return <div className='skill' name={props.name}>
    <div>{props.description}</div>
    <div className='skill-block-right'>
      {props.children}
      <button className='skill-set-button button-agree'
      onMouseEnter={() => SOUND_HOVER.play()}
      onClick={() => {
        props.set(props.skill);
        AGREE_SOUND.play();
      }}></button>
    </div>
  </div>;
}

export default Skill;
