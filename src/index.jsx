import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import appState from './AppState';
import App from './App';
import {Provider} from 'mobx-react'

render(
    <Provider appState={appState} >
      <App />
    </Provider>,
  document.getElementById('root')
);
