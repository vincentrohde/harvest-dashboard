// Libs
import React from 'react';
import {Grid} from 'semantic-ui-react';

// Redux
import {connect} from 'react-redux';

// Actions
import {addTimeEntries} from '@/stores/actions/timeEntries';
import {addProjects} from '@/stores/actions/projects';
import {addTasks} from '@/stores/actions/tasks';

// Selectors
import {filtersSelector} from '@/stores/selectors/filters';

// Components
import TasksByHours from '@/components/domain/TasksByHours/TasksByHours';
import DatePicker from '@/components/domain/DatePicker/DatePicker';
import EditForm from '@/components/domain/EditForm/EditForm';
import TimeEntries from '@/components/domain/TimeEntries/TimeEntries';
import DataOverview from '@/components/domain/DataOverview/DataOverview';

// Hooks
import {useGetTimeEntries} from './hooks/useGetTimeEntries/useGetTimeEntries';
import {useGetProjects} from './hooks/useGetProjects/useGetProjects';
import {useGetTasks} from './hooks/useGetTasks/useGetTasks';

// Types
import {groupsType} from '@/types/Group';
import {AppProps} from './App.types';

// Styles
import './App.scss';

const App = ({filters, addTimeEntries, addProjects, addTasks}: AppProps) => {
    const filterAPIDataForState = (list: groupsType) => {
        return list.map((item) => {
            return {
                id: item.id,
                name: item.name,
            };
        });
    };

    useGetTasks(filterAPIDataForState, addTasks);
    useGetProjects(filterAPIDataForState, addProjects);
    useGetTimeEntries(filters, addTimeEntries);

    return (
        <>
            <nav className="app-navbar">
                <h1 className="app-title">Harvest V2 API Client</h1>
            </nav>
            <section className="App">
                <Grid>
                    <Grid.Column width={16}>
                        <DatePicker />
                    </Grid.Column>

                    <Grid.Column width={16}>
                        <EditForm />
                    </Grid.Column>

                    <DataOverview />

                    <TasksByHours />

                    <TimeEntries />
                </Grid>
            </section>
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        filters: filtersSelector(state),
    };
};

const mapDispatchToProps = {
    addTimeEntries,
    addProjects,
    addTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
