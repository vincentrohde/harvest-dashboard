// Libs
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

// Components
import MetaDataHeader from './components/MetaDataHeader/MetaDataHeader';
import TimeEntry from './components/TimeEntry/TimeEntry';

// Redux
import { timeEntriesSelector } from '@/stores/selectors/timeEntries';
import { deleteTimeEntry } from '@/stores/actions/timeEntries';

// Hooks
import { useTotalHoursAndMinutes } from './hooks/useTotalHoursAndMinutes/useTotalHoursAndMinutes';

// Types
import { TimeEntriesProps } from './TimeEntries.types';

const TimeEntries = ({ timeEntries, deleteTimeEntry }: TimeEntriesProps) => {
    let totalHoursAndMinutes = '0:00';
    if (typeof timeEntries !== 'undefined') {
        totalHoursAndMinutes = useTotalHoursAndMinutes(timeEntries);
    }
    return (<>
        { typeof timeEntries !== 'undefined' && <Grid.Column width={16}>
            <MetaDataHeader totalHoursAndMinutes={totalHoursAndMinutes} entriesAmount={timeEntries.length}/>
            { timeEntries && timeEntries.map((item, key) => (
                <TimeEntry key={key} data={item} deleteTimeEntry={deleteTimeEntry} />))
            }
        </Grid.Column> }
    </>);
};

const mapStateToProps = (state: any) => {
    return {
        timeEntries: timeEntriesSelector(state)
    }
};

const mapDispatchToProps = { deleteTimeEntry };

export default connect(mapStateToProps, mapDispatchToProps)(TimeEntries);

