// Libs
import React from 'react';

// Components
import DropDown from '../../../DropDown/DropDown';

// Data
import { dateRanges } from './dateRanges';

// Types
import { PresetProps } from './Preset.types';

const Preset = ({ onChange, preset }: PresetProps) => <DropDown
    label={{
        children: "Preset",
        htmlFor: "form-select-control-task",
    }}
    searchInputId={"form-select-control-task"}
    clearable={true}
    options={dateRanges}
    placeholder={"Preset"}
    name={"preset"}
    onChange={onChange}
    value={preset}
/>;

export default Preset;
