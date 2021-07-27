import React from 'react';
import { Provider } from 'react-redux';
import store from '../../stores/store';
import Entries from '../Entries/Entries';

import './App.scss';

export const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <h1 className="app-title">Harvest V2 API Client</h1>
                <Entries />
            </div>
        </Provider>
    )
};
