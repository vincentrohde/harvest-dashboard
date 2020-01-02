import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import moment from 'moment';
import { setFilters } from '../../stores/actions/filters';
import { addTimeEntries } from '../../stores/actions/timeEntries';
import { addProjects } from '../../stores/actions/projects';
import { addTasks } from '../../stores/actions/tasks';
import { ObjectHelper } from '../../helpers';
import CategoriesOverview from '../CategoriesOverview/CategoriesOverview';
import EntriesList from '../EntriesList/EntriesList';
import Entry from '../Entry/Entry';
import DatePickerForm from '../DatePickerForm/DatePickerForm';
import { filtersSelector } from '../../stores/selectors/filters';

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
        const isNewFilters = ObjectHelper.isPropertyDifferentFromOldObject('filters', this.props, nextProps);

        if (isNewFilters) {
            this.getTimeEntries(isNewFilters);
        }
    }

    getTimeEntries (filters) {
        const that = this;
        const dateRange = this.getDateRange(filters.dateRange);

        if (dateRange) {
            axios.get(`${process.env.API_URL}/v2/time_entries?from=${dateRange[0]}&to=${dateRange[1]}`, {
                headers: {
                    ...this.headersAPI
                }
            })
                .then(function (response) {
                    const timeEntries = response.data.time_entries;
                    that.props.addTimeEntries(timeEntries);
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
                name: item.name
            }
        });

        return filteredList;
    }

    getDateRange (dateRange) {
        if (dateRange && dateRange.length) {
            if (dateRange.length > 1) {
                return [dateRange[0], dateRange[1]]
            } else {
                return [dateRange[0], dateRange[0]]
            }
        }

        return false;
    };

    render () {

        return (
            <section className='Entries'>
                <Grid>
                    <Grid.Column width={16}>
                        <DatePickerForm />
                    </Grid.Column>

                    <Grid.Column width={16}>
                        <Entry isEdit={true} isNew={true} />
                    </Grid.Column>

                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <CategoriesOverview />
                    </Grid.Column>

                    <Grid.Column width={16}>
                        <EntriesList />
                    </Grid.Column>
                </Grid>
            </section>
        )
    }
};

const mapStateToProps = state => {
    return {
        filters: filtersSelector(state)
    }
};

const mapDispatchToProps = {
    addTimeEntries,
    addProjects,
    addTasks,
    setFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(Entries);