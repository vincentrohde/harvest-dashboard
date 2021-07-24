// Libs
import React from 'react';
import { DateInput } from 'semantic-ui-calendar-react';

// Types
import { DateProps } from './Date.props';

const Date = ({date, isError, handleChange}: DateProps) => (<DateInput
    className="submit-btn"
    name="spent_date"
    placeholder="Date"
    label="Date"
    inlineLabel={false}
    dateFormat={"DD.MM.YYYY"}
    value={date}
    error={isError}
    onChange={handleChange}
/>);

export default Date;
