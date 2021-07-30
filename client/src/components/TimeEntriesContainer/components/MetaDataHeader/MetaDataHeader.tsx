// Libs
import React from 'react';

// Types
import { MetaDataHeaderProps } from './MetaDataHeader.types';

// Styling
import './MetaDataHeader.scss';

const MetaDataHeader = ({ entriesAmount, totalHoursAndMinutes }: MetaDataHeaderProps) => (
    <div className="MetaDataHeader tab-container">
        <p className="meta-data pipes">
            <span>{ entriesAmount } Entries</span>
            <span>{ totalHoursAndMinutes }</span>
        </p>
    </div>
);

export default MetaDataHeader;
