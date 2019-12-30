import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import moment from 'moment';
import { setFilters } from '../../stores/actions/filters';
import { addTimeEntries } from '../../stores/actions/timeEntries';
import { addActiveProjects, addProjects } from '../../stores/actions/projects';
import { addActiveTasks, addTasks } from '../../stores/actions/tasks';
import CategoriesOverview from '../CategoriesOverview/CategoriesOverview';
import EntriesList from '../EntriesList/EntriesList';
import Entry from '../Entry/Entry';
import DatePickerForm from '../DatePickerForm/DatePickerForm';

import style from './Entries.scss';

class Entries extends Component {
    constructor (props) {
        super();
        this.props = props;
        this.headersAPI = {
            'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN,
            'Harvest-Account-ID': process.env.ACCOUNT_ID
        };

        this.props.setFilters({
            dateRange: [
                moment().format('YYYY-MM-DD')
            ]
        });

        this.getProjects();
        this.getTasks();
    }

    shouldComponentUpdate (nextProps) {
        this.handleStateUpdate(nextProps);

        return true;
    }

    handleStateUpdate (nextProps) {
        const isNewPropDifferent = (selector) => {
            if (nextProps[selector]) {
                const dataOld = this.props[selector];
                const dataNew = nextProps[selector];

                const dataOldJSON = JSON.stringify(dataOld);
                const dataNewJSON = JSON.stringify(dataNew);

                if (dataOldJSON !== dataNewJSON) {
                    return dataNew;
                }

                return false;
            }

            return false;
        };

        const newFilters = isNewPropDifferent('filters');
        let newTasks = isNewPropDifferent('tasks');
        let newProjects = isNewPropDifferent('projects');

        if (newFilters) {
            this.getTimeEntries(newFilters);
        }

        if (newTasks) {
            newTasks = this.filterInactiveData(newTasks['tasks']);
            this.props.addActiveTasks(newTasks);
        }

        if (newProjects) {
            newProjects = this.filterInactiveData(newProjects['projects']);
            this.props.addActiveProjects(newProjects);
        }
    }

    getTimeEntries (filters) {
        const that = this;
        const getDateRange = ({ dateRange }) => {
            if (dateRange && dateRange.length) {
                if (dateRange.length > 1) {
                    return [dateRange[0], dateRange[1]]
                } else {
                    return [dateRange[0], dateRange[0]]
                }
            }

            return false;
        };

        const dateRange = getDateRange(filters);

        if (dateRange) {
            axios.get(`${process.env.API_URL}/v2/time_entries?from=${dateRange[0]}&to=${dateRange[1]}`, {
                headers: {
                    ...this.headersAPI
                }
            })
                .then(function (response) {
                    that.timeEntries = response.data.time_entries;
                    that.props.addTimeEntries(that.timeEntries);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
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

        const isHoursByCategory = (typeof this.hoursByCategory !== 'undefined') &&
            this.hoursByCategory.length;

        return (
            <section className='Entries'>
                <Grid>
                    <Grid.Column width={16}>
                        <DatePickerForm />
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Entry
                            isEdit={true}
                            isNew={true}
                        />
                    </Grid.Column>

                    { isHoursByCategory ?
                        (<Grid.Column mobile={16} tablet={8} computer={8}>
                            <CategoriesOverview
                                information={this.hoursByCategory}
                            />
                        </Grid.Column>) : null }

                    <Grid.Column width={16}>
                        <EntriesList timeEntries={this.props.timeEntries} />
                    </Grid.Column>
                </Grid>
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
    addTasks,
    setFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(Entries);