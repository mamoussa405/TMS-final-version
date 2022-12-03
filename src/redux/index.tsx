import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import root from './root';

// redux middles default - thunk - Allows for performing async actions
const middlewares: any[] = [thunk];

// logger middleware in development to explore redux state
// todo: if (process.env.NODE_ENV === 'development') middlewares.push(logger);

// temperal use of logger in production
middlewares.push(logger);

// root application store
const store = createStore(root, applyMiddleware(...middlewares));

export default store;
