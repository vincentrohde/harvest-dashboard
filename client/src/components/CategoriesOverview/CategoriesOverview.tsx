// Libs
import React from 'react';

// Redux
import { connect } from 'react-redux';

// Hooks
import { useCategoriesByHours } from './hooks/useCategoriesByHours/useCategoriesByHours';

// Services
import { objectService } from '../../lib/ObjectService/ObjectService';
import { timeEntriesSelector } from '../../stores/selectors/timeEntries';

// Variables
import { dataColors } from '../../variables/colors';

// Components
import ChartContainer from './components/ChartContainer/ChartContainer';

// Types
import { categoriesByHours, CategoriesOverviewProps } from './CategoriesOverview.types';

const CategoriesOverview = ({ timeEntries }: CategoriesOverviewProps) => {
    let data = {};
    const categoriesByHours = useCategoriesByHours(timeEntries);

    const getHoursByTwoDecimals = (entries: categoriesByHours) => {
        return entries.map((entry) =>
            Math.round(entry.hours * 100) / 100);
    }

    const getCategoriesFromEntries = (entries: categoriesByHours) => entries.map(entry => entry.category);

    const convertRawDataForChart = (entries: categoriesByHours) => {
        entries = objectService.sortObjectsArray(true, entries, 'hours');
        const categories = getCategoriesFromEntries(entries);
        const hours = getHoursByTwoDecimals(entries);
        return {
            categories,
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

    if (categoriesByHours.length) {
        const { hours, categories } = convertRawDataForChart(categoriesByHours);
        data = getChartData(hours, categories);
    }

    return (
        <>
            { !objectService.isEmptyObject(data) && <ChartContainer data={data} />}
        </>
    );
};

const mapStateToProps = (state: any): any => {
    return {
        timeEntries: timeEntriesSelector(state)
    }
};

export default connect(mapStateToProps, null)(
    React.memo(CategoriesOverview)
);
