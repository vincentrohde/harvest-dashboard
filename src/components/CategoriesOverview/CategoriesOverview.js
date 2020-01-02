import React, { Component } from 'react';
import Chart from 'chart.js';
import { ObjectHelper } from '../../helpers';
import { timeEntriesSelector } from '../../stores/selectors/timeEntries';
import { connect } from 'react-redux';

import style from './CategoriesOverview.scss';

class CategoriesOverview extends Component {
    constructor (props) {
        super();
        this.props = props;
        this.colorsArray = [
            '#f54291', '#ddb6c6', '#4baea0', '#b6e6bd', '#6bc5d2', '#d2fafb', '#ff935c', '#ef4b4b'
        ];
    }

    shouldComponentUpdate (nextProps) {
        const nextData = this.getHoursByCategory(nextProps.timeEntries);
        return this.isEqualProps(this.hoursByCategory, nextData);
    }

    componentDidMount () {
        this.setChart();
    }

    componentDidUpdate () {
        this.setChart();
    }

    convertRawDataForChart (entries) {
        entries = ObjectHelper.sortObjectsArray(true, entries, 'hours');
        const categories = this.getCategoriesFromEntries(entries);
        const hours = this.getHoursByTwoDecimals(entries);
        return {
            categories,
            hours
        }
    }

    getHoursByTwoDecimals (entries) {
        return entries.map(entry => Math.round(entry.hours * 100) / 100);
    }

    getCategoriesFromEntries (entries) {
        return entries.map(entry => entry.category);
    }

    isPropsHoursDifference (prevList, newList) {
        let isPropsHoursDifference = false;

        if (typeof newList === 'undefined' || newList.length === 0) {
            return isPropsHoursDifference;
        }

        prevList.forEach((prevItem) => {
            newList.forEach((newItem) => {
                if (prevItem.category === newItem.category) {
                    const convertedPrevHours = Number(prevItem.hours).toFixed(0);
                    const convertedNewHours = Number(newItem.hours).toFixed(0);

                    if (convertedNewHours !== convertedPrevHours) {
                        isPropsHoursDifference = true;
                    }
                }
            });
        });

        return isPropsHoursDifference;
    }

    isCategoryListChange (prevList, newList) {
        if (typeof prevList === 'undefined' || prevList === null || prevList.length === 0) {
            return true;
        }

        if ((prevList.length < newList.length) || (prevList.length > newList.length)) {
            return true;
        }

        return false;
    }

    isEqualProps (prevProps, newProps) {
        const isCategoryListChange = this.isCategoryListChange(prevProps, newProps);

        if (isCategoryListChange) {
            return true;
        }

        return this.isPropsHoursDifference(prevProps, newProps);
    }

    getChartDataObject (data, labels) {
        return {
            datasets: [{
                label: '',
                backgroundColor: this.colorsArray,
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

    setChart () {
        if (this.hoursByCategory) {
            const chartContainer = document.querySelector('.chart-canvas');
            const { hours, categories } = this.convertRawDataForChart(this.hoursByCategory);
            const data = this.getChartDataObject(hours, categories);

            const chart = new Chart(chartContainer, {
                type: 'doughnut',
                data
            });
        }
    }

    getHoursByCategory (entries) {
        const getHoursByCategory = (entries) => {
            const categoriesOnlyList = entries.map(entry => entry.category);
            const uniqueCategories = [...new Set(categoriesOnlyList)];
            let hoursByCategoryList = uniqueCategories.map((category) => {
                return {
                    category,
                    hours: 0
                }
            });

            entries.forEach(entry => {
                hoursByCategoryList.forEach((category) => {
                    if (category.category == entry.category) {
                        category.hours += entry.hours;
                    }
                });
            });

            return hoursByCategoryList;
        };

        let filteredEntries = [];

        entries.forEach((entry) => {
            filteredEntries.push({
                category: entry.task.name,
                hours: entry.hours
            });
        });

        return getHoursByCategory(filteredEntries);
    }

    render () {
        if (this.props.timeEntries) {
            this.hoursByCategory = this.getHoursByCategory(this.props.timeEntries);
        }

        return (
            <div className="CategoriesOverview tab-container">
                <h2 className="title">Categories</h2>
                <p className="caption">by hours</p>
                <div className="chart-container">
                    <canvas className="chart-canvas"></canvas>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        timeEntries: timeEntriesSelector(state)
    }
};

export default connect(mapStateToProps, null)(CategoriesOverview);