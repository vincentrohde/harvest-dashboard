// Libs
import React from 'react';

// Components
import Select from '@/components/presentation/Select/Select';

// Services
import timeService from '@/services/TimeService/TimeService';
import semanticUiService from '@/services/SemanticUiService/SemanticUiService';

// Types
import { TimeUnitSelectProps } from './TimeUnitSelect.types';

const TimeUnitSelect = ({ onChange, selectedTimeUnit }: TimeUnitSelectProps) => {
    const { timeUnits } = timeService;
    return (<Select
        label={{
            children: "Time Unit",
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
