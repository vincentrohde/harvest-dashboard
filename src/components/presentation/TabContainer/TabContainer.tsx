// Libs
import React from 'react';

// Types
import {TabContainerProps} from './TabContainer.types';

// Style
import styles from './TabContainer.module.scss';

const TabContainer = ({title, caption, children}: TabContainerProps) => (
    <div className={styles.TabContainer}>
        {(title || caption) && (
            <div className={styles['header-container']}>
                {title && title.length > 0 && <h2 className={styles.title}>{title}</h2>}
                {caption && caption.length > 0 && <p className={styles.tag}>{caption}</p>}
            </div>
        )}
        {children && children}
    </div>
);

export default TabContainer;
