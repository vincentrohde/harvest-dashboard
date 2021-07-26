// Libs
import React from 'react';

// Components
import TimeEntry from '../TimeEntry/TimeEntry';

// Redux
import { connect } from 'react-redux';
import { deleteTimeEntry } from '../../stores/actions/timeEntries';

// Types
import { TimeEntriesProps } from './TimeEntries.types';

const TimeEntries = ({ timeEntries, deleteTimeEntry }: TimeEntriesProps) => {
    return (<>
        { timeEntries.map((item, key) => (
            <TimeEntry key={key} data={item} deleteTimeEntry={deleteTimeEntry} />))
        }
    </>);
};

const mapDispatchToProps = { deleteTimeEntry };

export default connect(null, mapDispatchToProps)(TimeEntries);
