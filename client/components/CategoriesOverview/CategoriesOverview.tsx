// Typescript

import { timeEntriesType } from '../../../interfaces/TimeEntry';

// Libs

import React, { useState, useEffect } from 'react';
import Chart from 'chart.js';

// Redux

import { connect } from 'react-redux';

// Hooks

import { usePrevious } from '../../hooks/usePrevious';

// Services

import { objectService } from '../../lib/ObjectService/ObjectService';
import { timeEntriesSelector } from '../../stores/selectors/timeEntries';

// Variables

import { dataColors } from '../../variables/colors'

// Stylings

import './CategoriesOverview.scss';

type hoursByCategoryType = HoursByCategoryItemInterface[];

interface HoursByCategoryItemInterface {
    category: string;
    hours: number;
}

interface CategoriesOverviewProps {
    timeEntries?: timeEntriesType;
}

const CategoriesOverview = ({ timeEntries }: CategoriesOverviewProps) => {
    const colorsArray = dataColors;
    const [hoursByCategory, setHoursByCategory] = useState<hoursByCategoryType>([]);

    const prevHoursByCategory = usePrevious(hoursByCategory);

    const getHoursByTwoDecimals = (entries: hoursByCategoryType) => {
        return entries.map((entry) =>
            Math.round(entry.hours * 100) / 100);
    }

    const getCategoriesFromEntries = (entries: hoursByCategoryType) => {
        return entries.map(entry => entry.category);
    }

    const convertRawDataForChart = (entries: hoursByCategoryType) => {
        entries = objectService.sortObjectsArray(true, entries, 'hours');
        const categories = getCategoriesFromEntries(entries);
        const hours = getHoursByTwoDecimals(entries);
        return {
            categories,
            hours
        }
    }

    const getChartDataObject = (data: number[], labels: string[]) => {
        return {
            datasets: [{
                label: '',
                backgroundColor: colorsArray,
                borderWidth: '0',
                data
            }],
            options: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        fontColor: '#000'
                    }
                }
            },
            labels
        };
    }

    const setChart = (chartData: hoursByCategoryType) => {
        if (chartData.length) {
            // const chartContainer = document.querySelector('.chart-canvas');
            const { hours, categories } = convertRawDataForChart(chartData);
            const data = getChartDataObject(hours, categories);

            new Chart('.chart-canvas', {
                type: 'doughnut',
                // @ts-ignore
                data
            });
        }
    }

    const getEntriesWithCategory = (entries: timeEntriesType) => {
        const filteredEntries: hoursByCategoryType = [];

        entries.forEach((entry) => {
            filteredEntries.push({
                category: entry.task.name,
                hours: entry.hours
            });
        });

        return filteredEntries;
    }

    const getUniqueCategoriesFromEntries = (entries: hoursByCategoryType) => {
        const categoriesOnlyList = entries.map(entry => entry.category);
        return [...new Set(categoriesOnlyList)];
    };

    const getHoursByCategoryList = (categories: string[]): hoursByCategoryType => {
        return categories.map((category) => {
            return {
                category,
                hours: 0
            }
        });
    }

    const getHoursByCategory = (entries: timeEntriesType): hoursByCategoryType => {
        const entriesWithCategory = getEntriesWithCategory(entries);
        const uniqueCategories = getUniqueCategoriesFromEntries(entriesWithCategory);

        let hoursByCategoryList = getHoursByCategoryList(uniqueCategories);

        entriesWithCategory.forEach(entry => {
            hoursByCategoryList.forEach((category) => {
                if (category.category == entry.category) {
                    category.hours += entry.hours;
                }
            });
        });

        return hoursByCategoryList;
    };

    const isHoursDifference = (prevList: hoursByCategoryType, nextList: hoursByCategoryType) => {
        let isPropsHoursDifference = false;

        if (typeof nextList === 'undefined' || nextList.length === 0) {
            return isPropsHoursDifference;
        }

        for (let prevItem of prevList) {
            if (isPropsHoursDifference) break;

            for (let nextItem of nextList) {
                if (prevItem.category === nextItem.category) {
                    const convertedPrevHours = Number(prevItem.hours)
                        .toFixed(0);
                    const convertedNewHours = Number(nextItem.hours)
                        .toFixed(0);

                    if (convertedNewHours !== convertedPrevHours) {
                        isPropsHoursDifference = true;
                        break;
                    }
                }
            }
        }

        return isPropsHoursDifference;
    }

    // if timeentries different from old, then new hoursByCategory
    useEffect(() => {
        if (typeof timeEntries !== "undefined") {
            setHoursByCategory(getHoursByCategory(timeEntries));
        }
    }, [timeEntries]);

    // if hoursByCategory different then new setchart
    useEffect(() => {
        if (!isHoursDifference(prevHoursByCategory, hoursByCategory)) return;

        setChart(hoursByCategory);
    }, [hoursByCategory]);

    return (
        <div className="CategoriesOverview tab-container">
            <h2 className="title">Categories</h2>
            <p className="caption">by hours</p>
            <div className="chart-container">
                <canvas className="chart-canvas" />
            </div>
        </div>
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