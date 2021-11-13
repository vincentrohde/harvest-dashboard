// Libs
import React from 'react';

// Types
import {TabContainerProps} from './TabContainer.types';

// Style
import './TabContainer.scss';

const TabContainer = ({title, caption, children}: TabContainerProps) => (
    <div className="TabContainer">
        {(title || caption) && (
            <div className="header-container">
                {title && title.length > 0 && <h2 className="title">{title}</h2>}
                {caption && caption.length > 0 && <p className="tag">{caption}</p>}
            </div>
        )}
        {children && children}
    </div>
);

export default TabContainer;
