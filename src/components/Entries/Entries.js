import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { addTimeEntries } from '../../stores/actions/entries';

import PieChart from "../PieChart/PieChart";

class Entries extends Component {
    constructor (props) {
        super();
        this.props = props;

        this.getTimeEntries();
    }

    getTimeEntries () {
        const that = this;
        axios.get(process.env.API_URL + '/v2/time_entries', {
            headers: {
                "Authorization": "Bearer " + process.env.ACCESS_TOKEN,
                "Harvest-Account-ID": process.env.ACCOUNT_ID
            }
        })
            .then(function (response) {
                that.entries = response.data.time_entries;
                that.props.addTimeEntries({
                    timeEntries: that.entries
                });
                that.hoursByCategory = that.getHoursByCategory(that.props.entries.timeEntries);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getHoursByCategory (entries) {
        const getHoursByCategory = (entries) => {
            const categoriesOnlyList = entries.map(entry => entry.category);
            const uniqueCategories = [...new Set(categoriesOnlyList)];
            let hoursByCategoryList = uniqueCategories.map((category) => {
                return {
                    category,
                    hours: 0
                }
            });

            entries.forEach(entry => {
                hoursByCategoryList.forEach((category) => {
                    if (category.category == entry.category) {
                        category.hours += entry.hours;
                    }
                });
            });

            return hoursByCategoryList;
        };

        let filteredEntries = [];

        entries.forEach((entry) => {
            filteredEntries.push({
                category: entry.task.name,
                hours: entry.hours
            });
        });

        return getHoursByCategory(filteredEntries);
    }

    render () {
        const { timeEntries } = this.props.entries;

        return (
            <section className="Entries">
                <PieChart information={ this.hoursByCategory !== undefined ? this.hoursByCategory : null} />
            </section>
        )
    }
};

const mapStateToProps = state => {
    return {
        ...state
    }
};

const mapDispatchToProps = { addTimeEntries };

export default connect(mapStateToProps, mapDispatchToProps)(Entries);