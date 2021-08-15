// Libs
import React from 'react';
import { Form as SemanticUiForm } from 'semantic-ui-react';

// Components
import TimeUnit from '../TimeUnit/TimeUnit';

// Types
import { FormProps } from './Form.types';

const Form = ({ onChange, selectedTimeUnit }: FormProps) => {
    return <SemanticUiForm>
        <TimeUnit onChange={onChange} selectedTimeUnit={selectedTimeUnit}/>
    </SemanticUiForm>;
};

export default Form;
