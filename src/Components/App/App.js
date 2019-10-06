import React, { Component } from 'react';
import axios from "axios";

class App extends Component {
    constructor () {
        super();
        this.authenticateApp();
    }

    authenticateApp () {

        axios.get('https://api.harvestapp.com/v2/users/me', {
            headers: {
                "Authorization": "Bearer " + process.env.ACCESS_TOKEN,
                "Harvest-Account-ID": process.env.ACCOUNT_ID
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render () {
        return (
            <div className="App">
                <h1>Webpack + React setup</h1>
            </div>
        )
    }
};

export default App;