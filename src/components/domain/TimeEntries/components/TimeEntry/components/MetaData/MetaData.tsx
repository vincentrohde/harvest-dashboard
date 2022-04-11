// Libs
import React from 'react';
import classNames from 'classnames';

// Types
import { MetaDataProps } from './MetaData.types';

// Styles
import styles from './MetaData.module.scss';

const MetaData = ({notes, date, task}: MetaDataProps) => (<div className={styles['meta-data-container']}>
    <p className={classNames(styles['meta-data'], 'pipes')}>
        <span className={styles.task}>{task}</span>
        <span>{date}</span>
    </p>
    <h3 className={styles.title}>{notes}</h3>
</div>);

export default MetaData;
