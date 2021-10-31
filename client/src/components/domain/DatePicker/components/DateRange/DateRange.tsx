// Libs
import React from 'react';
import {DatesRangeInput} from 'semantic-ui-calendar-react';

// Types
import {DateRangeProps} from './DateRange.types';

const DateRange = ({onChange, value}: DateRangeProps) => (
    <DatesRangeInput
        className="date-picker"
        name={'dateRange'}
        label={{
            children: 'Date Range',
            htmlFor: 'form-select-control-task',
        }}
        placeholder={'From - To'}
        value={value}
        iconPosition="left"
        onChange={onChange}
    />
);

export default DateRange;
