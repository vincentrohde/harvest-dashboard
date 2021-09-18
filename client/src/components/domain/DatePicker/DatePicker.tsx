// Libs
import React, { useState } from 'react';
import { Form, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

// Components
import PresetSelect from './components/PresetSelect/PresetSelect';
import DateRange from './components/DateRange/DateRange';

// Services
import timeService from '@/services/TimeService/TimeService';

import { usePresetDateRange } from './hooks/usePresetDateRange/usePresetDateRange';

// Redux
import { updateDateRange } from '@/stores/actions/filters';
import { dateRangeFilterSelector } from '@/stores/selectors/filters';

// Types
import { FiltersInterface } from '@/types/Filters';
import { onChangeHandler } from '@/types/SemanticInput';
import { DatePickerProps } from './DatePicker.types';

// Stylings
import './DatePicker.scss';

const DatePicker = ({ dateRange, updateDateRange }: DatePickerProps) => {
    const [preset, setPreset] = useState('today');

    const cleanDateInputFormat = (dateList: RegExpMatchArray): string[] => {
        const hyphenRegex = /-/g;
        return dateList.map(item => item.replace(hyphenRegex, '.'));
    };

    const getArrayFromDateRangeInput = (input: string) => {
        const dateRegex = /(([0-9]{2})(-)([0-9]{2})(-)([0-9]{4}))/g;
        const matches = input.match(dateRegex);

        if (matches === null) return [];

        return cleanDateInputFormat(matches);
    }

    const convertDateRangeToDDMMYYY = (dateRange: string[]) => {
        return dateRange.map((item) => timeService.iso8601ToDDMMYYY(item));
    };

    const handlePresetChange: onChangeHandler = (_event: any, { value }: { value: string; }) => {
        setPreset(value);
    };

    const handleDateChange: onChangeHandler = (_event: any, { value }: { value: string; }) => {
        let newDateRange;

        if (value.length > 0) {
            newDateRange = getArrayFromDateRangeInput(value);
            newDateRange = timeService.convertDateRangeToISO8601(newDateRange);
        } else {
            newDateRange = value;
        }

        updateDateRange(newDateRange);
    };

    // For the User
    const getDateRangeValue = () => {
        // If 'all' was selected the user will see no date range
        if (dateRange === 1 || dateRange.length < 1) return '';

        const convertedDateRange = convertDateRangeToDDMMYYY(dateRange);

        if (convertedDateRange.length > 1) {
            return `${convertedDateRange[0]} - ${convertedDateRange[1]}`;
        }

        return `${convertedDateRange[0]}`;
    };

    usePresetDateRange(preset, (presetDateRange: FiltersInterface['dateRange']) => {
        let convertedDateRange: FiltersInterface['dateRange'] = presetDateRange;

        if (presetDateRange !== 1) {
            convertedDateRange = timeService.convertDateRangeToISO8601(presetDateRange);
        }

        updateDateRange(convertedDateRange);
    });

    return (
        <Form className="DatePicker">
            <Grid>
                <Grid.Column width={10}>
                    <DateRange
                        onChange={handleDateChange}
                        value={getDateRangeValue()}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <PresetSelect onChange={handlePresetChange} preset={preset}/>
                </Grid.Column>
            </Grid>
        </Form>
    )
}

const mapStateToProps = (state: any): {
    dateRange: FiltersInterface['dateRange'];
} => {
    return {
        dateRange: dateRangeFilterSelector(state)
    }
};

const mapDispatchToProps = { updateDateRange };

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
