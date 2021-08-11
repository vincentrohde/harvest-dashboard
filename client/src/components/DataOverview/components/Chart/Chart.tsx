// Libs
import React from 'react';
import { Bar } from 'react-chartjs-2';

// Options
import { options } from './Chart.options';

// Types
import { ChartProps } from './Chart.types';

const Chart = ({ data }: ChartProps) => <Bar data={data} options={options}/>;

export default Chart;
