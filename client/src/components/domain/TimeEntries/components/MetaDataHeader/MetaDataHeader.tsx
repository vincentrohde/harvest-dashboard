// Libs
import React from 'react';

// Types
import { MetaDataHeaderProps } from './MetaDataHeader.types';

// Styling
import './MetaDataHeader.scss';

const MetaDataHeader = ({ entriesAmount, totalHoursAndMinutes }: MetaDataHeaderProps) => (
    <div className="MetaDataHeader tab-container">
        <p className="meta-data pipes">
            <span>{ entriesAmount } { entriesAmount > 1 ? 'Entries': 'Entry'}</span>
            <span>Total Time: { totalHoursAndMinutes }</span>
        </p>
    </div>
);

export default MetaDataHeader;
