import { createStore } from 'redux'
import application from './reducers/reducers';

export default createStore(
    application,
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__({ serialize: true, trace: true })
);