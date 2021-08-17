// Libs
import React from 'react';

// Components
import DropDown from '../../../DropDown/DropDown';

// Services
import { timeService } from '../../../../lib/TimeService/TimeService';
import { semanticUiService } from '../../../../lib/SemanticUiService/SemanticUiService';

// Types
import { TimeUnitSelectProps } from './TimeUnitSelect.types';

const TimeUnitSelect = ({ onChange, selectedTimeUnit }: TimeUnitSelectProps) => {
    const { timeUnits } = timeService;
    return (<DropDown
        label={{
            children: "Time",
            htmlFor: "form-select-control-time-unit"
        }}
        searchInputId={"form-select-control-time-unit"}
        options={semanticUiService.getSelectOptionsFromArray(timeUnits)}
        placeholder=""
        name="timeUnit"
        onChange={onChange}
        value={selectedTimeUnit}
        width={4}
    />)
};

export default TimeUnitSelect;
