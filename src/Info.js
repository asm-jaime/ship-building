import React from 'react';
import './Info.css';

import { Store } from './Store';

const Info = () => {
  const { state } = React.useContext(Store);
  const [warningSygnal, setWarningSygnal] = React.useState('info-message-change');
  React.useLayoutEffect(()=>setWarningSygnal('info-message-default'), []);
  return (
    <div className='info'>
      <div className='info-title'>error messages:</div>
      <div className={warningSygnal}>{state.message}</div>
    </div>
  )
}

export default Info;
