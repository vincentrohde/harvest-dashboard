// Libs
import React from 'react';
import { Form as SemanticUiForm } from 'semantic-ui-react';

// Components
import TimeUnit from '../TimeUnit/TimeUnit';
import GroupSelect from '../GroupSelect/GroupSelect';

// Types
import { FormProps } from './Form.types';

const Form = ({ selectedTimeUnit, selectedGroup, handleTimeUnitSelect, handleGroupSelect }: FormProps) => {
    return <SemanticUiForm>
        <h2>Time Summary</h2>
        <SemanticUiForm.Group widths={'equal'}>
            <TimeUnit onChange={handleTimeUnitSelect} selectedTimeUnit={selectedTimeUnit} />
            <GroupSelect onChange={handleGroupSelect} selectedGroup={selectedGroup} groups={['tasks']} />
        </SemanticUiForm.Group>
    </SemanticUiForm>;
};

export default Form;
