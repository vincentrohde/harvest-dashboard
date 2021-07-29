// Libs
import React from 'react';

// Components
import Chart from '../Chart/Chart';

// Types
import { ChartContainerProps } from './ChartContainer.types';

const ChartContainer = ({ data }: ChartContainerProps) => (<div className="ChartContainer tab-container">
    <h2 className="title">Categories</h2>
    <p className="caption">by hours</p>
    <div className="chart-container">
        <Chart data={data} />
    </div>
</div>);

export default ChartContainer;
