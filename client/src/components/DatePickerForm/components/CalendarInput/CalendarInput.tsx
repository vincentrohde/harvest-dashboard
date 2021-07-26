// Libs
import React from 'react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';

// Types
import { CalendarInputProps } from './CalendarInput.types';

const CalendarInput = ({ onChange, setRef = null, value }: CalendarInputProps) => {
    return (
        <DatesRangeInput
            className="date-picker"
            name={"dateRange"}
            label={{
                children: "Date Range",
                htmlFor: "form-select-control-task" }}
            placeholder={"From - To"}
            value={value}
            iconPosition="left"
            onChange={onChange}
            ref={setRef}
        />
    );
}

export default CalendarInput;
