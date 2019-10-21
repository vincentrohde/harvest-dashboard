import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { addTimeEntries, updateEditEntry, updateTimeEntry } from '../../stores/actions/timeEntries';
import { addActiveProjects, addProjects } from '../../stores/actions/projects';
import { addActiveTasks, addTasks } from '../../stores/actions/tasks';

import style from './Entries.scss';

import CategoriesOverview from '../CategoriesOverview/CategoriesOverview';
import EntriesList from '../EntriesList/EntriesList';
import Entry from '../Entry/Entry';

class Entries extends Component {
    constructor (props) {
        super();
        this.props = props;
        this.headersAPI = {
            'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN,
            'Harvest-Account-ID': process.env.ACCOUNT_ID
        };

        this.getTimeEntries();
        this.getProjects();
        this.getTasks();
    }

    shouldComponentUpdate (nextProps) {
        this.handleStateUpdate(nextProps);

        return true;
    }

    handleStateUpdate (nextProps) {
        const filterData = (selector) => {
            if (nextProps[selector]) {
                const dataOld = this.props[selector];
                const dataNew = nextProps[selector];

                const dataOldJSON = JSON.stringify(dataOld);
                const dataNewJSON = JSON.stringify(dataNew);

                if (dataOldJSON !== dataNewJSON) {
                    return this.filterInactiveData(dataNew[selector]);
                }

                return false;
            }

            return false;
        }

        const newTasks = filterData('tasks');
        const newProjects = filterData('projects');

        if (newTasks) {
            this.props.addActiveTasks(newTasks);
        }

        if (newProjects) {
            this.props.addActiveProjects(newProjects);
        }
    }

    getTimeEntries () {
        const that = this;
        axios.get(process.env.API_URL + '/v2/time_entries', {
            headers: this.headersAPI
        })
            .then(function (response) {
                that.timeEntries = response.data.time_entries;
                that.props.addTimeEntries(that.timeEntries);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getTasks () {
        const that = this;
        axios.get(process.env.API_URL + '/v2/tasks', {
            headers: this.headersAPI
        })
            .then(function (response) {
                const { tasks } = response.data;
                const filteredTasksData = that.filterAPIDataForState(tasks);
                that.props.addTasks({
                    tasks: filteredTasksData
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getProjects () {
        const that = this;
        axios.get(process.env.API_URL + '/v2/projects', {
            headers: this.headersAPI
        })
            .then(function (response) {
                const { projects } = response.data;
                const filteredProjectsData = that.filterAPIDataForState(projects);
                that.props.addProjects({
                    projects: filteredProjectsData
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    filterAPIDataForState (list) {
        const filteredList = list.map(item => {
            return {
                id: item.id,
                name: item.name,
                isActive: item.is_default || item.is_active
            }
        });

        return filteredList;
    }

    filterInactiveData (list = []) {
        return list.filter(item => item.isActive === true);
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
        if (this.props.timeEntries.timeEntries) {
            this.hoursByCategory = this.getHoursByCategory(this.props.timeEntries.timeEntries);
        }

        return (
            <section className='Entries'>
                <Entry
                    isEdit={true}
                    isNew={true}
                />
                <CategoriesOverview
                    information={ this.hoursByCategory !== undefined ? this.hoursByCategory : null}
                />
                <EntriesList
                    timeEntries={this.props.timeEntries}
                    reducers={{
                        updateEditEntry,
                        updateTimeEntry
                    }}
                />
            </section>
        )
    }
};

const mapStateToProps = state => {
    return {
        ...state
    }
};

const mapDispatchToProps = {
    addTimeEntries,
    addActiveProjects,
    addProjects,
    addActiveTasks,
    addTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(Entries);