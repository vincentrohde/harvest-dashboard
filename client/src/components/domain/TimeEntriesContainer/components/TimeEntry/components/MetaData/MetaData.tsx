// Libs
import React from 'react';

// Types
import { MetaDataProps } from './MetaData.types';

// Styles
import './MetaData.scss';

const MetaData = ({notes, date, task}: MetaDataProps) => (<div className="meta-data-container">
    <p className="meta-data pipes">
        <span className="category">{task}</span>
        <span>{date}</span>
    </p>
    <h3 className="title">{notes}</h3>
</div>);

export default MetaData;
