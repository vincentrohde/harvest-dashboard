// Libs
import React from 'react';
import { Form, Input } from 'semantic-ui-react';

// Types
import { HoursProps } from './HoursProps';

const Hours = ({hours, isError, handleChange}: HoursProps) => (<Form.Field
    className="form-input"
    control={Input}
    label="Hours"
    placeholder="Hours"
    name="hours"
    error={isError}
    onChange={handleChange}
    value={hours}
    width={4}
/>);

export default Hours;
