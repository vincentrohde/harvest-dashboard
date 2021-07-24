// Libs
import React from 'react';
import { Grid } from 'semantic-ui-react';

// Types
import { timeEntriesType } from '../../../interfaces/TimeEntry';

// Components
import TimeEntry from './TimeEntry/TimeEntry';

interface TimeEntriesProps {
    timeEntries: timeEntriesType;
}

const TimeEntries = ({ timeEntries }: TimeEntriesProps) => {
    return (<Grid.Column width={16}>
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
    </Grid.Column>)
};

export default TimeEntries;
