import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { StoreProvider } from './Store';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <StoreProvider>
    <App/>
  </StoreProvider>,
  document.getElementById('root')
);

// to work offline and load faster unregister() to register()
serviceWorker.unregister();
