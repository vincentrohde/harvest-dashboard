// Libs

import React from 'react';

// Components

import DataOverview from './DataOverview';

// Typescript

import { timeEntriesType } from '../../../interfaces/TimeEntry';

interface CategoriesOverviewProps {
    timeEntries?: timeEntriesType;
}

const DataOverviewContainer = ({ timeEntries }: CategoriesOverviewProps) => {
    console.log('### timeEntries: ', timeEntries);

    return (<div className="tab-container">
        <DataOverview />
    </div>);
};

export default DataOverviewContainer;
