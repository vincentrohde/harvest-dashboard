// Libs
import React from 'react';

// Components
import DropDown from '@/components/DropDown/DropDown';

// Services
import { semanticUiService } from '@/services/SemanticUiService/SemanticUiService';

// Types
import { GroupSelectProps } from './GroupSelect.types';

const GroupSelect = ({ onChange, selectedGroup, groups }: GroupSelectProps) => {
    return (<DropDown
        label={{
            children: "Group",
            htmlFor: "form-select-control-group"
        }}
        searchInputId={"form-select-control-group"}
        options={semanticUiService.getSelectOptionsFromArray(groups)}
        placeholder=""
        name="group"
        onChange={onChange}
        value={selectedGroup}
        width={4}
    />)
};

export default GroupSelect;
