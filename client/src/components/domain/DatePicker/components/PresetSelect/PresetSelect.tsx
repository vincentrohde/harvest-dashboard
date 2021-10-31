// Libs
import React from 'react';

// Components
import Select from '@/components/presentation/Select/Select';

// Data
import {dateRanges} from './dateRanges';

// Types
import {PresetSelectProps} from './PresetSelect.types';

const PresetSelect = ({onChange, preset}: PresetSelectProps) => (
    <Select
        label={{
            children: 'Preset',
            htmlFor: 'form-select-control-task',
        }}
        searchInputId={'form-select-control-task'}
        clearable={true}
        options={dateRanges}
        placeholder={'Preset'}
        name={'preset'}
        onChange={onChange}
        value={preset}
    />
);

export default PresetSelect;
