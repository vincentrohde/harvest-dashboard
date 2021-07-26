// Libs
import React from 'react';
import { Icon } from 'semantic-ui-react';

// Types
import { TimeProps } from './Time.types';

// Styles
import './Time.scss';

const Time = ({ hoursAndMinutes, isActive, toggleActive }: TimeProps) => (<h3 className="Time">
    <Icon className="js-toggle-active"
        // @ts-ignore
          name={`clock${isActive ? '' : ' outline'}`} onClick={toggleActive}/>
    { hoursAndMinutes }
</h3>);

export default Time;
