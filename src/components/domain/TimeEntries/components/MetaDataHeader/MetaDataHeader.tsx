// Libs
import React from 'react';
import classNames from 'classnames';

// Types
import { MetaDataHeaderProps } from './MetaDataHeader.types';

// Styling
import styles from './MetaDataHeader.module.scss';

const MetaDataHeader = ({ entriesAmount, totalHoursAndMinutes }: MetaDataHeaderProps) => (
    <div className={classNames(styles.MetaDataHeader, 'tab-container')}>
        <p className={classNames(styles['meta-data'], 'pipes')}>
            <span>{ entriesAmount } { entriesAmount > 1 ? 'Entries': 'Entry'}</span>
            <span>Total Time: { totalHoursAndMinutes }</span>
        </p>
    </div>
);

export default MetaDataHeader;
