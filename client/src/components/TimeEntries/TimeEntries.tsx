// Libs
import React from 'react';

// Components
import TimeEntry from '../TimeEntry/TimeEntry';

// Redux
import { connect } from 'react-redux';
import { deleteTimeEntry } from '@redux/actions/timeEntries';
import { timeEntriesSelector } from '@redux/selectors/timeEntries';

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
