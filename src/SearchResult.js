import React from 'react';
import './SearchResult.css';
import { SHIP_SET } from './constants';

import { Store } from './Store';

const SearchResult = (props) => {
  const { state , dispatch} = React.useContext(Store);
  return (
    <div className="search-result">
    <div className="component-title">Search result</div>
    {state.searchResult.map((elem) => (
      <div className="result-ship" key={elem.name}
        onClick={() => dispatch({type: SHIP_SET, payload: elem})}>
        <img src={`./${elem.id}.png`} alt={`${elem.id}`}></img>
        <div className="result-ship-name">{elem.name}</div>
      </div>
    ))}
    </div>
  )
}

export default SearchResult;
