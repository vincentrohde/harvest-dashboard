// Libs
import React from 'react';
import { Grid } from 'semantic-ui-react';

// Redux
import { connect } from 'react-redux';

// Hooks
import { useTasksByHours } from '@/hooks/useTasksByHours/useTasksByHours';

// Services
import { objectService } from '@/services/ObjectService/ObjectService';
import { timeEntriesSelector } from '@/stores/selectors/timeEntries';

// Variables
import { dataColors } from '../../variables/colors';

// Components
import TabContainer from '@/components/presentation/TabContainer/TabContainer';
import Chart from './components/Chart/Chart';

// Types
import { TasksByHoursProps } from './TasksByHours.types';
import { tasksByHours } from '../../types/Task';

const TasksByHours = ({ timeEntries }: TasksByHoursProps) => {
    let data = {};
    const tasksByHours = useTasksByHours(timeEntries);

    const getHoursByTwoDecimals = (entries: tasksByHours) => {
        return entries.map((entry) =>
            Math.round(entry.hours * 100) / 100);
    };

    const getTasksFromEntries = (entries: tasksByHours) => entries.map(entry => entry.task);

    const convertRawDataForChart = (entries: tasksByHours) => {
        entries = objectService.sortObjectsArray(false, entries, 'hours');
        const tasks = getTasksFromEntries(entries);
        const hours = getHoursByTwoDecimals(entries);
        return {
            tasks,
            hours
        }
    }

    const getChartData = (data: number[], labels: string[]) => {
        return {
            datasets: [{
                label: 'Categories by Hours',
                backgroundColor: dataColors,
                borderWidth: '0',
                data
            }],
            labels
        };
    }

    if (tasksByHours.length) {
        const { hours, tasks } = convertRawDataForChart(tasksByHours);
        data = getChartData(hours, tasks);
    }

    return (
        <>
            { !objectService.isEmptyObject(data) && (<Grid.Column width={16}>
                <TabContainer title={'Tasks'} caption={'by total hours'}>
                    <Chart data={data}/>
                </TabContainer>
            </Grid.Column>)}
        </>
    );
};

const mapStateToProps = (state: any): any => {
    return {
        timeEntries: timeEntriesSelector(state)
    }
};

export default connect(mapStateToProps, null)(
    React.memo(TasksByHours)
);
