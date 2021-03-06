import React from 'react';
import './Info.css';

import { Store } from './Store';
import ComponentTitle from './ComponentTitle';
import ExportState from './ExportState';

const Info = () => {
  const { state } = React.useContext(Store);
  const [warningSygnal, setWarningSygnal] = React.useState('info-message-change');
  React.useLayoutEffect(() => setWarningSygnal('info-message-default'), []);
  return (
    <div className='info'>
      <ComponentTitle name='info'/>
      <div className={warningSygnal}>{state.message}</div>
      <div>
      <ExportState/>
      </div>
    </div>
  )
}

export default Info;
