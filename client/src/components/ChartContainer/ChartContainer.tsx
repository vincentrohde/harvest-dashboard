// Libs
import React from 'react';

// Types
import { ChartContainerProps } from './ChartContainer.types';

// Style
import './ChartContainer.scss';

const ChartContainer = ({ title, caption, children }: ChartContainerProps) => (<div className="ChartContainer tab-container">
    <h2 className="title">{ title }</h2>
    { caption && <p>{ caption }</p> }
    { children && children }
</div>);

export default ChartContainer;
