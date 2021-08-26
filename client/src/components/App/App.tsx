// Libs
import React from 'react';
import { Grid } from 'semantic-ui-react';

// Redux
import { connect } from 'react-redux';

// Actions
import { addTimeEntries } from '@redux/actions/timeEntries';
import { addProjects } from '@redux/actions/projects';
import { addTasks } from '@redux/actions/tasks';

// Selectors
import { filtersSelector } from '@redux/selectors/filters';

// Components
import TasksByHours from '@/components/TasksByHours/TasksByHours';
import DatePicker from '@/components/DatePicker/DatePicker';
import EditForm from '@/components/EditForm/EditForm';
import TimeEntriesContainer from '@/components/TimeEntriesContainer/TimeEntriesContainer';
import DataOverview from '@/components/DataOverview/DataOverview';

// Hooks
import { useGetTimeEntries } from './hooks/useGetTimeEntries/useGetTimeEntries';
import { useGetProjects } from './hooks/useGetProjects/useGetProjects';
import { useGetTasks } from './hooks/useGetTasks/useGetTasks';

// Types
import { categoriesType } from '../../types/Category';
import { AppProps } from './App.types';

// Styles
import './App.scss';

const App = ({
    filters,
    addTimeEntries,
    addProjects,
    addTasks }: AppProps) => {

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

    return (<section className="App">
            <h1 className="app-title">Harvest V2 API Client</h1>
            <Grid>
                <Grid.Column width={16}>
                    <DatePicker />
                </Grid.Column>

                <Grid.Column width={16}>
                    <EditForm />
                </Grid.Column>

                <DataOverview />

                <TasksByHours />

                <TimeEntriesContainer />

            </Grid>
        </section>)
}

const mapStateToProps = (state: any) => {
    return {
        filters: filtersSelector(state)
    }
};

const mapDispatchToProps = {
    addTimeEntries,
    addProjects,
    addTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
