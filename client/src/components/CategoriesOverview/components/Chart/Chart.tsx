// Libs
import React from 'react';
import { Bar } from 'react-chartjs-2';

// Data
import { options } from './Chart.options';

// Types
import { ChartProps } from './Chart.types';

const Chart = ({ data }: ChartProps) => {
    // @ts-ignore
    return <Bar data={data} options={options} />
};

export default Chart;
