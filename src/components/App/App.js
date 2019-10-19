import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from '../../stores/store';

import style from './App.scss';

import Entries from '../Entries/Entries';

class App extends Component {
    constructor () {
        super();
    }

    render () {
        return (
            <Provider store={store}>
                <div className="App">
                    <h1 className="app-title">Harvest Dashboard</h1>
                    <Entries />
                </div>
            </Provider>
        )
    }
};

export default App;