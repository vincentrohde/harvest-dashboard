// Libs
import { useState, useEffect } from 'react';

// Services
import { timeService } from '@/services/TimeService/TimeService';

// Colors
import { dataColors } from '../../../../variables/colors';

// Hooks
import { useTimeEntriesByTimeUnit } from '@hooks/useTimeEntriesByTimeUnit/useTimeEntriesByTimeUnit';
import { useGroupLabel } from '../useGroupLabel/useGroupLabel';
import { useGetByHours } from '../useGetByHours/useGetByHours';

// Types
import { DataSet, byHoursList, byHours, byHoursItem } from './useChartData.types';
import { group } from '../../DataOverview.types';
import { timeEntriesType } from '../../../../types/TimeEntry';
import { timeUnit } from '@/services/TimeService/TimeService.types';

export const useChartData = (timeEntries: timeEntriesType | undefined, group: group, timeUnit: timeUnit) => {
    const [chartData, setChartData] = useState<Chart.ChartData>({});
    const sortedTimeEntries = useTimeEntriesByTimeUnit(timeEntries, timeUnit);
    const groupLabel = useGroupLabel(group);
    const getByHours = useGetByHours(group);

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

    const getUniqueGroupMembers = (byHoursList: byHoursList) => {
        let groupMembers: string[] = [];

        byHoursList.forEach((byHours: byHours) => {
            // @ts-ignore
            byHours.forEach((item: byHoursItem) => groupMembers.push(item[groupLabel]))
        });

        return [...new Set(groupMembers)];
    };

    const getDataSets = (byHoursList: byHoursList) => {
        const uniqueGroupMembers = getUniqueGroupMembers(byHoursList);
        let datasSets = getEmptyDataSets(uniqueGroupMembers);

        datasSets.forEach((dataSet) => {
            byHoursList.forEach((byHours: byHours) => {
                let isDataSetInGroup = false;
                byHours.forEach((item: byHoursItem) => {
                    // @ts-ignore
                    if (!isDataSetInGroup && dataSet.label === item[groupLabel]) {
                        isDataSetInGroup = true;
                        dataSet.data.push(item.hours);
                    }
                });

                if (!isDataSetInGroup) {
                    dataSet.data.push(0);
                }
            })
        });

        return datasSets;
    }

    const getChartData = (byHoursList: byHoursList): Chart.ChartData => ({
        labels: getLabels(),
        datasets: getDataSets(byHoursList)
    });

    const getByHoursList = (timeEntriesList: timeEntriesType[]) => {
        let byHoursList: byHoursList = [];

        if (typeof getByHours !== 'undefined') {
            timeEntriesList.forEach(entries => {
                const byHours = getByHours(entries);
                // @ts-ignore
                byHoursList.push(byHours);
            });
        }

        return byHoursList;
    }

    const updateChartData = () => {
        const byHoursList = getByHoursList(sortedTimeEntries);
        setChartData(getChartData(byHoursList));
    }

    useEffect(() => {
        updateChartData();
    }, [sortedTimeEntries, group]);

    return chartData;
};
