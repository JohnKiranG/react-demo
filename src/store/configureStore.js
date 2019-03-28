import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import createRootReducer from '../reducers';
import initialState from './initialState';

export const history = createHistory({
  basename: process.env.PUBLIC_URL
});

const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-underscore-dangle
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

export default createStore(createRootReducer(history), initialState, composedEnhancers);
