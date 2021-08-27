// Libs
import React from 'react';
import { connect } from 'react-redux';

// Components
import TimeEntry from '../TimeEntry/TimeEntry';

// Redux
import { deleteTimeEntry } from '@/stores/actions/timeEntries';
import { timeEntriesSelector } from '@/stores/selectors/timeEntries';

// Types
import { TimeEntriesProps } from './TimeEntries.types';

const TimeEntries = ({ timeEntries, deleteTimeEntry }: TimeEntriesProps) => {
    return (<>
        { timeEntries && timeEntries.map((item, key) => (
            <TimeEntry key={key} data={item} deleteTimeEntry={deleteTimeEntry} />))
        }
    </>);
};

const mapStateToProps = (state: any) => {
    return {
        timeEntries: timeEntriesSelector(state)
    }
};

const mapDispatchToProps = { deleteTimeEntry };

export default connect(mapStateToProps, mapDispatchToProps)(TimeEntries);
