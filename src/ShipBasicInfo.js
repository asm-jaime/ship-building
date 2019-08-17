import React from 'react';
import './ShipBasicInfo.css';
import { Store } from './Store';
import ComponentTitle from './ComponentTitle';

import skills from './resSkills';

const ShipBasicInfo = (props) => {
  const { state } = React.useContext(Store);
  const ship = state.ship;

  return (
    <div className='basic-info'>
      <ComponentTitle name='basic info'/>
      <div className='basic-info-name'>
        <img src={ship.img} alt={`${ship.id}`}></img>
        <a target='_blank' rel='noopener noreferrer' href={ship.href}>
          {ship.name}({ship.size})
        </a>
      </div>
      <div className='basic-info-optional-skills'>
      {state.ship.skills.available.map((skill, key) => <img
          key={key} src={skills[skill.id]['img']}
          title={skills[skill.id]['name']} alt={ship.id}
        />
      )}
      </div>
      <div className='basic-info-levels'>
        Level: {ship.levels.advent} / {ship.levels.trade} / {ship.levels.battle}
      </div>
      <div className='basic-info-parts'>
        <span className='part-name'>studding sails: </span>
        <span className='part-number'>{ship.ship_equipment.studding_sails}</span>
        <span className='part-name'>broadsides: </span>
        <span className='part-number'>{ship.ship_equipment.broadsides}</span>
        <span className='part-name'>special equip: </span>
        <span className='part-number'>{ship.ship_equipment.special_equipment}</span>
        <span className='part-name'>bow turret: </span>
        <span className='part-number'>{ship.ship_equipment.bow_turret}</span>
        <span className='part-name'>extra armour: </span>
        <span className='part-number'>{ship.ship_equipment.extra_armouring}</span>
        <span className='part-name'>stern turret: </span>
        <span className='part-number'>{ship.ship_equipment.stern_turret}</span>
      </div>
      <div className='basic-info-general'>
        <span className='part-name'>Sailors Required:</span>
        <span className='part-number'>{ship.cabine_capacity.required}</span>
        <span className='part-name'>No. of Improvements:</span>
        <span className='part-number'>
          {ship.improvement.limit.base}+{ship.improvement.limit.add.limit}
        </span>
        <span className='part-name'>Req. Building Days:</span>
        <span className='part-number'>{ship.days}</span>
      </div>
    </div>
  );
}

export default ShipBasicInfo;
