// Typescript

import { SemanticInputProps } from '../../../../interfaces/components/SemanticInput';

// Libs

import React from 'react';
import { Form, Select } from 'semantic-ui-react';

interface DropDownInputProps extends SemanticInputProps {
    clearable?: boolean;
    options: any;
    searchInputId: string;
}

const DropDownInput = ({ clearable = false, label, name, onChange, options, placeholder, searchInputId, value }: DropDownInputProps) => {
    return (
        <Form.Field
            control={Select}
            label={label}
            search
            searchInput={{ id: searchInputId }}
            options={options}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
            clearable={clearable}
        />
    );
}

export default DropDownInput;