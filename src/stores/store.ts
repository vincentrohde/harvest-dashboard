import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import application from './reducers/reducers';

export default createStore(
    application,
    {},
    composeWithDevTools(applyMiddleware())
);
