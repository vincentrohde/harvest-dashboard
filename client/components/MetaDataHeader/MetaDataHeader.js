import React from 'react';

import style from './MetaDataHeader.scss';

const MetaDataHeader = (props) => {
    return (
        <div className="MetaDataHeader tab-container">
            <p className="meta-data pipes">
                <span>{ props.entriesAmount } Entries</span>
                <span>Total: { props.totalTime }</span>
            </p>
        </div>
    )
};

export default MetaDataHeader;