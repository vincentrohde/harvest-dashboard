import React from 'react';
import { Provider } from 'react-redux';
import store from '../../stores/store';
import Entries from '../Entries/Entries';

import style from './App.scss';

const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <h1 className="app-title">Harvest Dashboard</h1>
                <Entries />
            </div>
        </Provider>
    )
};

export default App;