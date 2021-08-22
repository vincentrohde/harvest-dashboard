// Libs
import React from 'react';
import { Grid } from 'semantic-ui-react';

// Components
import TimeEntries from '../TimeEntries/TimeEntries';

// Redux
import { connect } from 'react-redux';
import { timeEntriesSelector } from '../../stores/selectors/timeEntries';

// Hooks
import { useTotalHoursAndMinutes } from './hooks/useTotalHoursAndMinutes/useTotalHoursAndMinutes';

// Types
import { TimeEntriesContainerProps } from './TimeEntriesContainer.types';
import MetaDataHeader from './components/MetaDataHeader/MetaDataHeader';

const TimeEntriesContainer = ({ timeEntries }: TimeEntriesContainerProps) => {
    let totalHoursAndMinutes = '0:00';
    if (typeof timeEntries !== 'undefined') {
        totalHoursAndMinutes = useTotalHoursAndMinutes(timeEntries);
    }
    return (<>
        { typeof timeEntries !== 'undefined' && <Grid.Column width={16}>
            <MetaDataHeader totalHoursAndMinutes={totalHoursAndMinutes} entriesAmount={timeEntries.length}/>
            <TimeEntries />
        </Grid.Column> }
    </>);
};

const mapStateToProps = (state: any) => {
    return {
        timeEntries: timeEntriesSelector(state)
    }
};

export default connect(mapStateToProps, null)(TimeEntriesContainer);

