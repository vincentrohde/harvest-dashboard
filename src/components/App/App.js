import React, { Component } from 'react';
import axios from "axios";
import moment from 'moment';
import { Provider } from "../../stores/Store";

import style from './App.scss';

import Entries from '../Entries/Entries';

class App extends Component {
    constructor () {
        super();
        this.state = {
            hasData: false,
        };

        this.moment = moment;

        this.authenticateApp();
    }

    authenticateApp () {
        const that = this;
        axios.get(process.env.API_URL + '/v2/time_entries', {
            headers: {
                "Authorization": "Bearer " + process.env.ACCESS_TOKEN,
                "Harvest-Account-ID": process.env.ACCOUNT_ID
            }
        })
            .then(function (response) {
                console.log('### response: ', response);
                that.setState({hasData: true, entries: response.data.time_entries});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render () {
        return (
            <Provider>
                <div className="App">
                    <h1>React-Harvest</h1>
                    { this.state.hasData !== false
                        ? <Entries data={this.state.entries} />
                        : null
                    }
                </div>
            </Provider>
        )
    }
};

export default App;