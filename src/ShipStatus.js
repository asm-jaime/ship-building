import React from 'react';
import './ShipStatus.css';
import { Store } from './Store';

import { SKILLS_OPTIONAL } from './constants';

const ShipStatus = () => {
  const { state } = React.useContext(Store);
  const ship = state.ship;

  // show nothing, in case empty data
  if(!ship.id) {
    return (<div className="ship-status"></div>);
  }

  return (
    <div className="ship-status">
      <div className="ship-status-name">
        <img src={`./${ship.id}.png`} alt={`${ship.id}`}></img>
        <a target="_blank" rel="noopener noreferrer" href={ship.href}>
          {ship.name}({ship.size})
        </a>
      </div>
      <div className="ship-status-optional-skills">
      {ship.skills.map( skill => (
        <img
          key={skill.id} src={`./${skill.id}.png`} alt={`${ship.id}`}
          title={SKILLS_OPTIONAL[skill.id].name}
        ></img>
      ))}
      </div>
      <div className="ship-status-levels">
        Level: {ship.levels.advent} / {ship.levels.trade} / {ship.levels.battle}
      </div>
      <div className="ship-status-parts">
        <span className="part-name">studding sails: </span>
        <span className="part-number">{ship.ship_equipment.studding_sails}</span>
        <span className="part-name">broadsides: </span>
        <span className="part-number">{ship.ship_equipment.broadsides}</span>
        <span className="part-name">special equip: </span>
        <span className="part-number">{ship.ship_equipment.special_equipment}</span>
        <span className="part-name">bow turret: </span>
        <span className="part-number">{ship.ship_equipment.bow_turret}</span>
        <span className="part-name">extra armour: </span>
        <span className="part-number">{ship.ship_equipment.extra_armouring}</span>
        <span className="part-name">stern turret: </span>
        <span className="part-number">{ship.ship_equipment.stern_turret}</span>
      </div>
      <div className="ship-status-general">
        <span className="part-name">Sailors Required:</span>
        <span className="part-number">{ship.cabine.required}</span>
        <span className="part-name">No. of Improvements:</span>
        <span className="part-number">
          {ship.improvement.max}+{ship.improvement.additional}
        </span>
        <span className="part-name">Req. Building Days:</span>
        <span className="part-number">{ship.days}</span>
      </div>
    </div>
  );
}

export default ShipStatus;
