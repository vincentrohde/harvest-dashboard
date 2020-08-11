// Typescript

import { timeEntriesType } from '../../../interfaces/TimeEntry';
import { categoriesType } from '../../../interfaces/Category';
import { projectsType } from '../../../interfaces/Project';
import { tasksType } from '../../../interfaces/Task';
import { FiltersInterface } from '../../../interfaces/Filters';

// Libs
import React, { useState, useEffect } from 'react';
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

import { backendService } from '../../lib/BackendService/BackendService';
import { errorService } from '../../lib/ErrorService/ErrorService';
import { objectService } from '../../lib/ObjectService/ObjectService';

// Components

// import CategoriesOverview from '../CategoriesOverview/CategoriesOverview';
import DatePickerForm from '../DatePickerForm/DatePickerForm';
// import DataOverview from '../DataOverview/DataOverview';
import TimeEntry from '../TimeEntry/TimeEntry';
import EditForm from '../EditForm/EditForm';

// Hooks

import { usePrevious } from '../../hooks/usePrevious';

// Styles

import './Entries.scss';

interface EntriesProps {
    timeEntries: timeEntriesType;
    filters: FiltersInterface;
    projects: projectsType;
    tasks: tasksType;
    addTimeEntries: Function;
    addProjects: Function;
    addTasks: Function;
    setFilters: Function;
}

const Entries = ({
    timeEntries = [],
    filters,
    projects,
    tasks,
    addTimeEntries,
    addProjects,
    addTasks,
    setFilters }: EntriesProps) => {

    const prevFilters = usePrevious({ filters });
    const [isLoadingMetaData, setIsLoadingMetaData] = useState(true);

    const filterAPIDataForState = (list: categoriesType) => {
        return list.map(item => {
            return {
                id: item.id,
                name: item.name,
            }
        });
    }

    const getDateRange = (dateRange: FiltersInterface['dateRange']) => {
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
                .then((timeEntries: timeEntriesType) => {
                    addTimeEntries(timeEntries);
                })
                .catch(errorService.handleBasicApiError);
        }
    }

    const getTasks = () => {
        backendService.getTasks()
            .then((tasks: tasksType) => {
                const filteredTasksData = filterAPIDataForState(tasks);
                addTasks({
                    tasks: filteredTasksData
                });
            }).catch(errorService.handleBasicApiError);
    }

    const getProjects = () => {
        backendService.getProjects()
            .then((projects: projectsType) => {
                const filteredProjectsData = filterAPIDataForState(projects);

                addProjects({
                    projects: filteredProjectsData
                });
            }).catch(errorService.handleBasicApiError);
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
            if (objectService.isNewObjectDifferent(prevFilters, filters)) {
                getTimeEntries();
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
                        isNewEntry={true} />
                </Grid.Column>

                {/*{ (timeEntries.length > 0) && (*/}
                {/*    <Grid.Column mobile={16} tablet={8} computer={8}>*/}
                {/*        <CategoriesOverview />*/}
                {/*    </Grid.Column>*/}
                {/*) }*/}

                {/*<Grid.Column mobile={16} tablet={16} computer={16}>*/}
                {/*    <DataOverview/>*/}
                {/*</Grid.Column>*/}

                <Grid.Column width={16}>
                    { timeEntries.map((item, key) => {
                        return (
                            <TimeEntry
                                key={key}
                                hours={item.hours}
                                id={item.id}
                                is_running={item.is_running}
                                notes={item.notes}
                                spent_date={item.spent_date}
                                task={item.task}
                                project={item.project} /> )
                    })}
                </Grid.Column>
            </Grid>
        ) }
    </section>)
}

const mapStateToProps = (state: any) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Entries);