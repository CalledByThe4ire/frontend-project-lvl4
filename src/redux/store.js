import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Rollbar from 'rollbar';
import rollbarMiddleware from 'rollbar-redux-middleware';
import rootReducer from '.';
import rollbarConfig from '../../config/rollbar';

const initialState = {};

const rollbarRedux = rollbarMiddleware(new Rollbar(rollbarConfig));

const middlewares = [thunk, rollbarRedux];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
