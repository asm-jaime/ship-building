import React from 'react';
import './Search.css';

import { Button } from 'react-bootstrap';
import { Form, Col } from 'react-bootstrap';

import { Store } from './Store';

const Search = (props) => {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    fetch('./res.json')
      .then(res => res.json())
      .then(data => console.log(data));
    console.log('search');
    console.log(state);
  });
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="search">
    <Form onSubmit={ handleSubmit }>
    <Form.Group as={Col} controlId="formGridAdvLvl">
      <Form.Label md="1">adv lvl: </Form.Label>
      <Form.Control type="number" value={state.search_params.lvl_advent.from}/>
      <Form.Control type="number" value={state.search_params.lvl_advent.to}/>
    </Form.Group>
    </Form>
    </div>
  )
}

export default Search;
