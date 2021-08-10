// Libs
import React from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
    responsive: true,
    scales: {
        xAxes: [{
            stacked: true,
        }],
        yAxes: [{
            stacked: true
        }]
    }
}

const DataOverview = ({ data }: { data: Chart.ChartData }) => <Bar data={data} options={options}/>;

export default DataOverview;
