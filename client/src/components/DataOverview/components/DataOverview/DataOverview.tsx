// Libs
import React from 'react';

// Components
import Chart from '../Chart/Chart';
import Form from '../Form/Form';

// Types
import { DataOverviewProps } from './DataOverview.types';

const DataOverview = ({ data, onChange, selectedTimeUnit }: DataOverviewProps) => {
    return <div className="tab-container">
        <Form onChange={onChange} selectedTimeUnit={selectedTimeUnit}/>
        <Chart data={data} />
    </div>
};

export default DataOverview;
