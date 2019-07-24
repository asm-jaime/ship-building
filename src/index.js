import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { StoreProvider } from './Store';

import { initLoadIDB } from './IndexedDB';

import * as serviceWorker from './serviceWorker';

initLoadIDB()
  .then((status) => {
    console.log(status);
    ReactDOM.render(
      <StoreProvider><App/></StoreProvider>,
      document.getElementById('root')
    );
  })
  .catch(console.log);
;


// to work offline and load faster unregister() to register()
serviceWorker.unregister();
