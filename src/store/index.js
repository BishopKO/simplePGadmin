import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import pgReducer from 'reducer';

const composeEnhancers = compose;

const store = createStore(pgReducer, composeEnhancers(applyMiddleware(thunk)));
export default store;
