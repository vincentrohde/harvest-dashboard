import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { addTimeEntries } from '../../stores/actions/entries';
import { addTasks } from '../../stores/actions/tasks';

import style from './Entries.scss';

import CategoriesOverview from '../CategoriesOverview/CategoriesOverview';
import EntriesList from "../EntriesList/EntriesList";

class Entries extends Component {
    constructor (props) {
        super();
        this.props = props;

        this.getTimeEntries();
        this.getTasks();
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
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getTasks () {
        const that = this;
        axios.get(process.env.API_URL + '/v2/tasks', {
            headers: {
                "Authorization": "Bearer " + process.env.ACCESS_TOKEN,
                "Harvest-Account-ID": process.env.ACCOUNT_ID
            }
        })
            .then(function (response) {
                const { tasks } = response.data;
                const filteredTasksData = that.filterTasksDataForStateSet(tasks);
                that.props.addTasks({
                    tasks: filteredTasksData
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    filterTasksDataForStateSet (tasks) {
        let filteredTasks = tasks.map(task => {
            return {
                id: task.id,
                name: task.name,
                isActive: task.is_default
            }
        });

        return filteredTasks;
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
        if (this.props.entries.timeEntries) {
            this.hoursByCategory = this.getHoursByCategory(this.props.entries.timeEntries);
        }

        return (
            <section className="Entries">
                <CategoriesOverview
                    information={ this.hoursByCategory !== undefined ? this.hoursByCategory : null}
                />
                <EntriesList />
            </section>
        )
    }
};

const mapStateToProps = state => {
    return {
        ...state
    }
};

const mapDispatchToProps = { addTimeEntries, addTasks };

export default connect(mapStateToProps, mapDispatchToProps)(Entries);