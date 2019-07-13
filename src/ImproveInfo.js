import React from 'react';
import './ImproveInfo.css';
import { Store } from './Store';

const ImproveInfo = (props) => {
  const { state } = React.useContext(Store);
  const ship = state.ship;

  // show nothing, in case empty data
  /*
  if(!ship.id) {
    return (<div className="improve-status"></div>);
  }
  */

  return (
    <div className="improve-info">
    <div className="info-grade">
    <span>Grade: {ship.grade.rank}({ship.grade.type})</span>
    </div>
    </div>
  )
}

export default ImproveInfo;
