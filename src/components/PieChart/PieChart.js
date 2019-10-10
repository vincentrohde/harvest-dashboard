import React, { useEffect } from 'react';
import Chart from 'chart.js';

import style from './PieChart.scss';

const PieChart = (props) => {
    if (props.information) {
        const { information } = props;
        console.log('### information: ', information);
    }
    const colorsArray = [
        '#f54291', '#ddb6c6', '#4baea0', '#b6e6bd', '#6bc5d2', '#d2fafb', '#ff935c', '#ef4b4b'
    ];

    const data = {
        datasets: [{
            label: 'My First dataset',
            backgroundColor: colorsArray,
            data: [10, 20, 30, 10]
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue',
            'Orange'
        ]
    };

    useEffect(() => {
        const chartContainer = document.querySelector('.chart-canvas');

        const chart = new Chart(chartContainer, {
            type: 'doughnut',
            data: data
        });
    });

    return (
        <div className="PieChart">
            <canvas className="chart-canvas"></canvas>
        </div>
    );
}

export default PieChart;