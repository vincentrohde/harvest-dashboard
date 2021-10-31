import { createStore } from 'redux'
import application from './reducers/reducers';

export default createStore(
    application,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__
    && (window as any).__REDUX_DEVTOOLS_EXTENSION__({ serialize: true, trace: true })
);