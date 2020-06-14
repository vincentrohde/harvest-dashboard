import React from 'react';
import {Bar} from 'react-chartjs-2';
import {dataColors} from '../../variables/colors';

const data = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [{
        label: 'Dataset 1',
        backgroundColor: dataColors[0],
        data: [1,2,3,4]
    }, {
        label: 'Dataset 2',
        backgroundColor: dataColors[1],
        data: [1,2,4,8]
    }, {
        label: 'Dataset 3',
        backgroundColor: dataColors[2],
        data: [1,3,6,9]
    }]
};

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

export default function DataOverview () {
    return (
        <div className="tab-container">
            <Bar data={data} options={options}/>
        </div>
    )
}