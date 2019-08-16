import React from 'react';
import './SearchResult.css';
import { SHIP_SET } from './constants';

import { Store } from './Store';

const SearchResult = (props) => {
  const { state, dispatch } = React.useContext(Store);
  return (
    <div className='search-result'>
    <div className='component-title'>Search result</div>
    {state.searchResult.map(ship => (
      <div className='result-ship' key={ship.name}
        onClick={() => dispatch({type: SHIP_SET, payload: ship})}>
        <img src={ship.img} alt={ship.id}/>
        <div className='result-ship-name'>{ship.name}</div>
      </div>
    ))}
    </div>
  )
}

export default SearchResult;
