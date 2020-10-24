// Typescript

import { SemanticInputProps } from '../../../../interfaces/components/SemanticInput';

// Libs

import React from 'react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';

export type setRef = (element: DatesRangeInput) => void;

interface CalendarInputProps extends SemanticInputProps {
    setRef?: setRef | null;
}

const CalendarInput = ({ label, name, onChange, placeholder = "From - To", setRef = null, value }: CalendarInputProps) => {
    return (
        <DatesRangeInput
            className="date-picker"
            name={name}
            label={label}
            placeholder={placeholder}
            value={value.toString()}
            iconPosition="left"
            onChange={onChange}
            ref={setRef}
        />
    );
}

export default CalendarInput;