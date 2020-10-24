// Libs
import React from 'react';

// Styling
import './MetaDataHeader.scss';

interface MetaDataHeaderProps {
    entriesAmount: number;
    totalTime: number;
}

const MetaDataHeader = ({ entriesAmount, totalTime }: MetaDataHeaderProps) => (
    <div className="MetaDataHeader tab-container">
        <p className="meta-data pipes">
            <span>{ entriesAmount } Entries</span>
            <span>Total: { totalTime }</span>
        </p>
    </div>
);

export default MetaDataHeader;