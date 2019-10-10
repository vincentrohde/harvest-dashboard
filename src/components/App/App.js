import React, { Component } from 'react';
import moment from 'moment';

import { Provider } from 'react-redux';
import store from '../../stores/store';

import style from './App.scss';

import Entries from '../Entries/Entries';

class App extends Component {
    constructor () {
        super();
        this.moment = moment;
    }

    render () {
        return (
            <Provider store={store}>
                <div className="App">
                    <h1>React-Harvest</h1>
                    <Entries />
                </div>
            </Provider>
        )
    }
};

export default App;