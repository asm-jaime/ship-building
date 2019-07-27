import React from 'react';
import './ImproveStatus.css';
import { Store } from './Store';

import { IMPROVEABLE_PROPERTIES } from './constants.js';

import ImproveProgress from './ImproveStatusProgress.js';
import ImproveMaterial from './ImproveStatusMaterial.js';
import ImproveLog from './ImproveLog.js';
import ImproveGradeLog from './ImproveGradeLog.js';

import { TabPane, TabbedArea } from './Tabs';

const ImproveStatus = (props) => {
  const { state } = React.useContext(Store);
  const ship = state.ship;

  return (
    <div className="improve-status">
    {IMPROVEABLE_PROPERTIES.map(elem => (
      <ImproveProgress key={elem} res={ship[elem]} name={elem}/>
    ))}
    <ImproveMaterial material={ship.material}/>
    <TabbedArea>
    <TabPane display='improve'>
      <ImproveLog size={ship.size} improvements={state.improvements}/>
    </TabPane>
    <TabPane display='grade'>
      <ImproveGradeLog/>
    </TabPane>
    </TabbedArea>
    </div>
  )
}

export default ImproveStatus;
