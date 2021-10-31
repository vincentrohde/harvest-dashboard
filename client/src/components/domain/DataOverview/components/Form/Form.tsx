// Libs
import React from 'react';
import {Form as SemanticUiForm} from 'semantic-ui-react';

// Components
import TimeUnitSelect from '../TimeUnitSelect/TimeUnitSelect';
import GroupSelect from '../GroupSelect/GroupSelect';

// Types
import {FormProps} from './Form.types';

const Form = ({
    groups,
    selectedTimeUnit,
    selectedGroup,
    handleTimeUnitSelect,
    handleGroupSelect,
}: FormProps) => {
    return (
        <SemanticUiForm>
            <SemanticUiForm.Group widths={'equal'}>
                <TimeUnitSelect
                    onChange={handleTimeUnitSelect}
                    selectedTimeUnit={selectedTimeUnit}
                />
                <GroupSelect
                    onChange={handleGroupSelect}
                    selectedGroup={selectedGroup}
                    groups={groups}
                />
            </SemanticUiForm.Group>
        </SemanticUiForm>
    );
};

export default Form;
