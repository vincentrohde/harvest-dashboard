// Libs
import React, {useState, useEffect } from 'react';

// Components
import DataOverview from './components/DataOverview/DataOverview';

// Services
import { tasksSortService } from '../../lib/TasksSortService/TasksSortService';
import { timeService } from '../../lib/TimeService/TimeService';

// Hooks
import { useTimeEntriesByTimeUnit } from '../../hooks/useTimeEntriesByTimeUnit/useTimeEntriesByTimeUnit';

// Redux
import { connect } from 'react-redux';
import { timeEntriesSelector } from '../../stores/selectors/timeEntries';

// Data
import { dataColors } from '../../variables/colors';

// Types
import { tasksByHours } from '../../../interfaces/Task';
import { timeUnit } from '../../lib/TimeService/TimeService.types';
import { CategoriesOverviewProps, DataSet } from './DataOverviewContainer.types';
import { timeEntriesType } from '../../../interfaces/TimeEntry';
import { onChangeHandler } from '../../../interfaces/components/SemanticInput';

const DataOverviewContainer = ({ timeEntries }: CategoriesOverviewProps) => {
    const { timeUnits } = timeService;
    const [timeUnit, setTimeUnit] = useState<timeUnit>(timeUnits[2]);
    const [chartData, setChartData] = useState<Chart.ChartData>({});
    // const [dataTopic] = useState('tasks');

    const sortedTimeEntries = useTimeEntriesByTimeUnit(timeEntries, timeUnit);

    const getLabels = () => {
        let labels: string[] = [];

        sortedTimeEntries.forEach((group) => {
            labels.push(timeService.getDateRangeByTimeUnit(group[0].spent_date, timeUnit))
        });

        return labels;
    }

    const getEmptyDataSets = (dataGroupLabels: string[]) => {
        let datasets: DataSet[] = [];

        for (let i = 0; i < dataGroupLabels.length; i++) {
            datasets.push({
                label: dataGroupLabels[i],
                backgroundColor: dataColors[i],
                data: []
            });
        }

        return datasets;
    };

    const getUniqueTasks = (tasksByHoursList: tasksByHours[]) => {
        let tasks: string[] = [];

        tasksByHoursList.forEach((tasksByHours) => {
            tasksByHours.forEach(({ task }) => tasks.push(task))
        });

       return [...new Set(tasks)];
    };

    const getDataSets = (tasksByHoursList: tasksByHours[]) => {
        const uniqueTasks = getUniqueTasks(tasksByHoursList);

        let datasSets = getEmptyDataSets(uniqueTasks);

        datasSets.forEach((dataSet) => {
            tasksByHoursList.forEach(tasksByHours => {
                let isDataSetInGroup = false;
                tasksByHours.forEach(({ task, hours }) => {
                    if (!isDataSetInGroup && dataSet.label === task) {
                        isDataSetInGroup = true;
                        dataSet.data.push(hours);
                    }
                });

                if (!isDataSetInGroup) {
                    dataSet.data.push(0);
                }
            })
        });

        return datasSets;
    }

    const getChartData = (dataFields: tasksByHours[]): Chart.ChartData => ({
        labels: getLabels(),
        datasets: getDataSets(dataFields)
    });

    const getTasksByHoursList = (timeEntriesList: timeEntriesType[]) => {
        let tasksByHoursList: tasksByHours[] = [];

        timeEntriesList.forEach(entries => {
            const tasksByHours = tasksSortService.getTasksByHours(entries);
            tasksByHoursList.push(tasksByHours);
        });

        return tasksByHoursList;
    }

    const handleTimeUnitUpdate: onChangeHandler = (_event, { value }) => {
        // @ts-ignore
        setTimeUnit(value);
    }

    useEffect(() => {
        if (sortedTimeEntries) {
            const dataFields = getTasksByHoursList(sortedTimeEntries);
            const chartDataObject = getChartData(dataFields);

            setChartData(chartDataObject);
        }
    }, [sortedTimeEntries]);

    return (<>
        { typeof timeEntries !== 'undefined' && timeEntries.length > 0 && <DataOverview data={chartData} onChange={handleTimeUnitUpdate} selectedTimeUnit={timeUnit}/>}
    </>);
};

const mapStateToProps = (state: any) => {
    return {
        timeEntries: timeEntriesSelector(state)
    }
};

export default connect(mapStateToProps)(DataOverviewContainer);
