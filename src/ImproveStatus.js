import React from 'react';
import './ImproveStatus.css';
import { Store } from './Store';

import { IMPROVEABLE_PROPERTIES } from './constants.js';

import ImproveProgress from './ImproveStatusProgress';
import ImproveMaterial from './ImproveStatusMaterial';
import ImproveLog from './ImproveLog';
import ImproveLogGrade from './ImproveLogGrade';
import ImproveCustom from './ImproveCustom';

import Tabs from './Tabs';

const ImproveStatus = (props) => {
  const { state } = React.useContext(Store);
  const ship = state.ship;

  return (
    <div className="improve-status">
    {IMPROVEABLE_PROPERTIES.map(elem => (
      <ImproveProgress key={elem} res={ship[elem]} name={elem}/>
    ))}
    <ImproveMaterial material={ship.material}/>
    <Tabs>
      <ImproveLog name='improve' size={ship.size} improvements={state.improvements}/>
      <ImproveLogGrade name='grade' size={ship.grade_size} grades={state.grades}/>
      <ImproveCustom name='custom'/>
    </Tabs>
    </div>
  )
}

export default ImproveStatus;
