import React from 'react';
import './SearchResult.css';
import { SHIP_SET, SOUND_CLICK, ADD_RESET, RECALCULATE_ALL } from './constants';

import { Store } from './Store';
import ComponentTitle from './ComponentTitle';

const SearchResult = (props) => {
  const { state, dispatch } = React.useContext(Store);
  return (
    <div className='search-result'>
    <ComponentTitle name='search result'/>
    {state.searchResult.map(ship => (
      <div className='result-ship' key={ship.name}
        onClick={() => {
          dispatch({type: SHIP_SET, payload: ship});
          dispatch({type: ADD_RESET});
          dispatch({type: RECALCULATE_ALL});
          SOUND_CLICK.play();
        }}>
        <img src={ship.img} alt={ship.id}/>
        <div className='result-ship-name'>{ship.name}</div>
      </div>
    ))}
    </div>
  )
}

export default SearchResult;
