import React, { Component } from 'react';
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
import { apiService } from '../../lib/ApiService/ApiService';

import style from './Entries.scss';

class Entries extends Component {
    constructor (props) {
        super();
        this.props = props;

        this.props.setFilters({
            dateRange: [
                moment().format('YYYY-MM-DD')
            ]
        });

        this.getProjects();
        this.getTasks();
    }

    shouldComponentUpdate (nextProps) {
        return this.handleStateUpdate(nextProps);
    }

    handleStateUpdate (nextProps) {
        const isNewFilters = ObjectHelper.isPropertyDifferentFromOldObject('filters', this.props, nextProps);

        if (isNewFilters) {
            this.getTimeEntries(isNewFilters);

            return isNewFilters;
        }

        return false;
    }

    getTimeEntries (filters) {
        const dateRange = this.getDateRange(filters.dateRange);

        if (dateRange) {
            const from = dateRange[0];
            const to = dateRange[1];
            apiService.getTimeEntries(from, to)
                .then((timeEntries) => {
                    this.props.addTimeEntries(timeEntries);
                });
        }
    }

    getTasks () {
        apiService.getTasks()
            .then((tasks) => {
                const filteredTasksData = this.filterAPIDataForState(tasks);
                this.props.addTasks({
                    tasks: filteredTasksData
                });
            });
    }

    getProjects () {
        apiService.getProjects()
            .then((projects) => {
                const filteredProjectsData = this.filterAPIDataForState(projects);
                this.props.addProjects({
                    projects: filteredProjectsData
                });
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