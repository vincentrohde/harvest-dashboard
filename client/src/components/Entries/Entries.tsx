// Types
import { timeEntriesType } from '../../../interfaces/TimeEntry';
import { categoriesType } from '../../../interfaces/Category';
import { projectsType } from '../../../interfaces/Project';
import { tasksType } from '../../../interfaces/Task';
import { FiltersInterface } from '../../../interfaces/Filters';

// Libs
import React from 'react';
import { Grid } from 'semantic-ui-react';

// Redux
import { connect } from 'react-redux';
import { addTimeEntries } from '../../stores/actions/timeEntries';
import { addProjects } from '../../stores/actions/projects';
import { addTasks } from '../../stores/actions/tasks';
import { timeEntriesSelector } from '../../stores/selectors/timeEntries';
import { filtersSelector } from '../../stores/selectors/filters';
import { projectsSelector } from '../../stores/selectors/projects';
import { tasksSelector } from '../../stores/selectors/tasks';

// Components
import DataOverviewContainer from '../DataOverview/DataOverviewContainer';
import DatePicker from '../DatePicker/DatePicker';
import TimeEntries from '../TimeEntries/TimeEntries';
import EditForm from '../EditForm/EditForm';

// Hooks
import { useGetTimeEntries } from './hooks/useGetTimeEntries/useGetTimeEntries';
import { useGetProjects } from './hooks/useGetProjects/useGetProjects';
import { useGetTasks } from './hooks/useGetTasks/useGetTasks';

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
}

const Entries = ({
    timeEntries = [],
    filters,
    projects,
    tasks,
    addTimeEntries,
    addProjects,
    addTasks }: EntriesProps) => {

    const filterAPIDataForState = (list: categoriesType) => {
        return list.map(item => {
            return {
                id: item.id,
                name: item.name,
            }
        });
    };

    useGetTasks(filterAPIDataForState, addTasks);
    useGetProjects(filterAPIDataForState, addProjects);
    useGetTimeEntries(filters, addTimeEntries);

    const isMetaDataLoaded = projects && projects.length > 0 && tasks && tasks.length > 0;

    return (<section className='Entries'>
        { isMetaDataLoaded && (
            <Grid>
                <Grid.Column width={16}>
                    <DatePicker />
                </Grid.Column>

                <Grid.Column width={16}>
                    <EditForm />
                </Grid.Column>

                {/*{ (timeEntries.length > 0) && (*/}
                {/*    <Grid.Column mobile={16} tablet={8} computer={8}>*/}
                {/*        <CategoriesOverview />*/}
                {/*    </Grid.Column>*/}
                {/*) }*/}

                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <DataOverviewContainer timeEntries={timeEntries}/>
                </Grid.Column>

                <Grid.Column width={16}>
                    <TimeEntries timeEntries={timeEntries} />
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
    addTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(Entries);
