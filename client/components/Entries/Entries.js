import React, { Component, useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import moment from 'moment';

// Redux

import { connect } from 'react-redux';

import { setFilters } from '../../stores/actions/filters';
import { addTimeEntries } from '../../stores/actions/timeEntries';
import { addProjects } from '../../stores/actions/projects';
import { addTasks } from '../../stores/actions/tasks';

import { timeEntriesSelector } from '../../stores/selectors/timeEntries';
import { filtersSelector } from '../../stores/selectors/filters';
import { projectsSelector } from '../../stores/selectors/projects';
import { tasksSelector } from '../../stores/selectors/tasks';

// Services

import { objectService } from '../../lib/ObjectService/ObjectService';
import { backendService } from '../../lib/BackendService/BackendService';

// Components

import CategoriesOverview from '../CategoriesOverview/CategoriesOverview';
import DatePickerForm from '../DatePickerForm/DatePickerForm';
import DataOverview from '../DataOverview/DataOverview';
import TimeEntry from '../TimeEntry/TimeEntry';
import EditForm from '../EditForm/EditForm';

// Hooks

import { usePrevious } from '../../hooks/usePrevious';

import style from './Entries.scss';

const NewEntries = ({
    timeEntries = [],
    filters,
    projects,
    tasks,
    addTimeEntries,
    addProjects,
    addTasks,
    setFilters }) => {

    const prevFilters = usePrevious({ filters });
    const [isLoadingMetaData, setIsLoadingMetaData] = useState(true);

    const filterAPIDataForState = (list) => {
        return list.map(item => {
            return {
                id: item.id,
                name: item.name
            }
        });
    }

    const getDateRange = (dateRange) => {

        if (dateRange && dateRange.length) {
            if (dateRange.length > 1) {
                return [dateRange[0], dateRange[1]]
            } else {
                return [dateRange[0], dateRange[0]]
            }
        }

        return false;
    };

    const getTimeEntries = () => {
        const dateRange = getDateRange(filters.dateRange);

        if (dateRange) {
            const from = dateRange[0];
            const to = dateRange[1];
            backendService.getTimeEntries(from, to)
                .then((timeEntries) => {
                    addTimeEntries(timeEntries);
                });
        }
    }

    const getTasks = () => {
        backendService.getTasks()
            .then((tasks) => {
                const filteredTasksData = filterAPIDataForState(tasks);

                addTasks({
                    tasks: filteredTasksData
                });
            });
    }

    const getProjects = () => {
        backendService.getProjects()
            .then((projects) => {
                const filteredProjectsData = filterAPIDataForState(projects);

                addProjects({
                    projects: filteredProjectsData
                });
            });
    }

    useEffect(() => {
        if (objectService.isEmptyObject(filters)) {
            setFilters({
                dateRange: [moment().format('YYYY-MM-DD')]
            });
        }
    });

    useEffect(() => {
        if (!isLoadingMetaData) return;

        getProjects();
        getTasks();
    }, [isLoadingMetaData])

    useEffect(() => {
        const isDoneLoading = !isLoadingMetaData;
        if (isDoneLoading) return;

        const isProjectsEmpty = objectService.isEmptyObject(projects);
        const isTasksEmpty = objectService.isEmptyObject(tasks);
        const isInLoadingState = isProjectsEmpty || isTasksEmpty;
        if (isInLoadingState) return;

        setIsLoadingMetaData(false);

    }, [projects, tasks]);

    useEffect(() => {
        if (!objectService.isEmptyObject(filters)) {
            if (objectService.isNewObjectDifferent(prevFilters.filters, filters)) {
                getTimeEntries(filters);
            }
        }
    }, [filters]);

    return (<section className='Entries'>
        { !isLoadingMetaData && (
            <Grid>
                <Grid.Column width={16}>
                    <DatePickerForm />
                </Grid.Column>

                <Grid.Column width={16}>
                    <EditForm
                        isNewEntry={true}
                        entryData={{ date: getDateRange(filters.dateRange)[0] }} />
                </Grid.Column>

                { (timeEntries.length > 0) && (
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <CategoriesOverview />
                    </Grid.Column>
                ) }

                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <DataOverview/>
                </Grid.Column>

                <Grid.Column width={16}>
                    { timeEntries.map((item, key) => {
                        return (
                            <TimeEntry
                                key={key}
                                hours={item.hours}
                                id={item.id}
                                isRunning={item.is_running}
                                notes={item.notes}
                                date={item.spent_date}
                                task={item.task}
                                project={item.project} /> )
                    })}
                </Grid.Column>
            </Grid>
        ) }
    </section>)
}

const mapStateToProps = state => {
    return {

        timeEntries: timeEntriesSelector(state),
        filters: filtersSelector(state),
        tasks: tasksSelector(state),
        projects: projectsSelector(state)
    }
};

const mapDispatchToProps = {
    addTimeEntries,
    addProjects,
    addTasks,
    setFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEntries);