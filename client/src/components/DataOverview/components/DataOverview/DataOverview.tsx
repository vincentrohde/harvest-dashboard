// Libs
import React from 'react';

// Components
import Chart from '../Chart/Chart';
import Form from '../Form/Form';

// Types
import { DataOverviewProps } from './DataOverview.types';

const DataOverview = ({ data, handleTimeUnitSelect, handleGroupSelect, selectedTimeUnit, selectedGroup }: DataOverviewProps) => {
    return <div className="tab-container">
        <Form handleTimeUnitSelect={handleTimeUnitSelect}
              handleGroupSelect={handleGroupSelect}
              selectedGroup={selectedGroup}
              selectedTimeUnit={selectedTimeUnit} />
        <Chart data={data} />
    </div>
};

export default DataOverview;
