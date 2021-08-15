// Libs
import React from 'react';

// Components
import DropDown from '../../../DropDown/DropDown';

// Services
import { timeService } from '../../../../lib/TimeService/TimeService';

// Types
import { TimeUnitProps } from './TimeUnit.types';
import { SelectOptionsList } from '../../../../lib/SemanticUiService/SemanticUiService';

const TimeUnit = ({ onChange, selectedTimeUnit }: TimeUnitProps) => {
    const { timeUnits } = timeService;

    const getSelectOptions = (): SelectOptionsList => {
        return timeUnits.map((unit, index) => ({
            value: unit,
            text: unit[0].toUpperCase() + unit.slice(1),
            key: index.toString()
        }));
    };

    return (<DropDown
        label={{
            children: "Time",
            htmlFor: "form-select-control-time-unit"
        }}
        searchInputId={"form-select-control-task"}
        options={getSelectOptions()}
        placeholder=""
        name="timeUnit"
        onChange={onChange}
        value={selectedTimeUnit}
    />)
};

export default TimeUnit;
