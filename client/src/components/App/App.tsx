// Libs
import React from 'react';
import { Grid } from 'semantic-ui-react';

// Redux
import { Provider, connect } from 'react-redux';
import store from '../../stores/store';

// Actions
import { addTimeEntries } from '../../stores/actions/timeEntries';
import { addProjects } from '../../stores/actions/projects';
import { addTasks } from '../../stores/actions/tasks';

// Selectors
import { filtersSelector } from '../../stores/selectors/filters';

// Components
import TasksByHours from '../TasksByHours/TasksByHours';
import DatePicker from '../DatePicker/DatePicker';
import EditForm from '../EditForm/EditForm';
import TimeEntriesContainer from '../TimeEntriesContainer/TimeEntriesContainer';
import DataOverview from '../DataOverview/DataOverview';

// Hooks
import { useGetTimeEntries } from './hooks/useGetTimeEntries/useGetTimeEntries';
import { useGetProjects } from './hooks/useGetProjects/useGetProjects';
import { useGetTasks } from './hooks/useGetTasks/useGetTasks';

// Types
import { categoriesType } from '../../../interfaces/Category';
import { AppProps } from './App.types';

// Styles
import './Entries.scss';

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

    return (<Provider store={store}>
        <section className="App">
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
        </section>
    </Provider>)
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
