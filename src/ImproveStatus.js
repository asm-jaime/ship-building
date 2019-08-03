import React from 'react';
import './ImproveStatus.css';
import { Store } from './Store';

import { IMPROVEABLE_PROPERTIES } from './constants.js';

import ImproveProgress from './ImproveStatusProgress.js';
import ImproveMaterial from './ImproveStatusMaterial.js';
import ImproveLog from './ImproveLog.js';
import ImproveLogGrade from './ImproveLogGrade.js';

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
    </Tabs>
    </div>
  )
}

export default ImproveStatus;
