import React, { useEffect } from 'react';
import Chart from 'chart.js';
import Utils from "../../utils/utils";

import style from './CategoriesOverview.scss';

const CategoriesOverview = (props) => {
    useEffect(() => {
        const colorsArray = [
            '#f54291', '#ddb6c6', '#4baea0', '#b6e6bd', '#6bc5d2', '#d2fafb', '#ff935c', '#ef4b4b'
        ];

        const prepareDataForChart = (entries) => {
            entries = Utils.sortObjectsArray(true, entries, 'hours');
            const categories = entries.map(entry => entry.category);
            const hours = entries.map(entry => Math.round(entry.hours * 100) / 100);
            return {
                categories,
                hours
            }
        };

        if (props.information) {
            const chartContainer = document.querySelector('.chart-canvas');
            const { information } = props;
            const { hours, categories } = prepareDataForChart(information);

            const data = {
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: colorsArray,
                    borderWidth: '0',
                    data: hours
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
                labels: categories
            };

            const chart = new Chart(chartContainer, {
                type: 'doughnut',
                data: data
            });
        }
    });

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

export default CategoriesOverview;