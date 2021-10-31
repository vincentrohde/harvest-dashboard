// Libs
import React from 'react';
import {Form, Select as SemanticSelect} from 'semantic-ui-react';

// Types
import {SelectTypes} from './Select.types';

const Select = ({
    clearable = false,
    label,
    name,
    onChange,
    options,
    placeholder,
    searchInputId,
    value,
    width = 16,
}: SelectTypes) => {
    return (
        <Form.Field
            control={SemanticSelect}
            label={label}
            search
            searchInput={{id: searchInputId}}
            options={options}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            clearable={clearable}
            width={width}
        />
    );
};

export default Select;
