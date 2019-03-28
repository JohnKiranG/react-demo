import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import {
  Route, Switch,
} from 'react-router-dom';
import configureStore, { history } from './store/configureStore';
import App from './App';
import * as serviceWorker from './serviceWorker';

const target = document.querySelector('#root');

ReactDOM.render(
  <Provider store={configureStore}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
        </Switch>
    </ConnectedRouter>
  </Provider>,
  target,
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
