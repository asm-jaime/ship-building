import React from 'react';
import './ImproveStatus.css';
import { Store } from './Store';
import LinearProgress from '@material-ui/core/LinearProgress';

const ImproveStatus = (props) => {
  const { state } = React.useContext(Store);
  const ship = state.ship;

  // show nothing, in case empty data
  /*
  if(!ship.id) {
    return (<div className="improve-status"></div>);
  }
  */

  return (
    <div className="improve-status">
    <LinearProgress
    variant="determinate" value={10} />
    </div>
  )
}

export default ImproveStatus;
