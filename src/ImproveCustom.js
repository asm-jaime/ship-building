import React from 'react';
import './ImproveCustom.css';

import { Store } from './Store';

import Custom from './Custom';

import {
  IMPROVE_CUSTOM_SET,
  IMPROVEABLE_PROPERTIES,
} from './constants'

const ImproveCustom = (props) => {
  const { state , dispatch } = React.useContext(Store);

  return (
    <div className='improve-custom'>
      {IMPROVEABLE_PROPERTIES.map((name, key) =>
        <Custom name={name} key={key} resource={state.ship[name]}
          set={event => {
            const value = parseInt(event.target.value);
            dispatch({ type: IMPROVE_CUSTOM_SET, payload: {name, value}});
          }}
        />
      )}
    </div>
  );
};

export default ImproveCustom;
