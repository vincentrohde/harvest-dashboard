// Typescript

import { FiltersInterface } from '../../../interfaces/Filters';

// Libs

import React, { useEffect, useState } from 'react';
import { Form, Grid, Select } from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import { DatesRangeInput} from 'semantic-ui-calendar-react';

// Services

import { timeService } from '../../lib/TimeService/TimeService';

// Redux

import { updateDateRange } from '../../stores/actions/filters';
import { dateRangeFilterSelector } from '../../stores/selectors/filters';

// Stylings

import './DatePickerForm.scss';

interface DatePickerFormProps {
    dateRange: FiltersInterface['dateRange'];
    updateDateRange: Function;
}

const ranges = [
    {
        key: '1',
        value: 'today',
        text: 'Today',
    },
    {
        key: '2',
        value: 'one-week',
        text: 'Last Week',
    },
    {
        key: '3',
        value: 'one-month',
        text: 'Last Month',
    },
    {
        key: '4',
        value: 'one-year',
        text: 'Last Year',
    }
];

const DatePickerForm = ({ dateRange, updateDateRange }: DatePickerFormProps) => {
    let datePicker: DatesRangeInput | null;
    const currentDay = moment().format('DD-MM-YYYY');
    const [preset, setPreset] = useState('');

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

    const handleChange = (_event: any, { name, value }: { name: string; value: string; }) => {
        if (name === 'preset') {
            setPreset(value);
            return;
        }

        if (name === 'dateRange') {
            let dates;

            if (value.length) {
                dates = getArrayFromDateRangeInput(value);
                dates = dates.map(item => timeService.ddMMYYYYToISO8601(item));
            } else {
                dates = value;
            }

            updateDateRange(dates);
            return;
        }
    }

    const setDatePicker = (element: DatesRangeInput) => {
        datePicker = element;
    };

    const getDateRangeValue = () => {
        if (!dateRange.length) return '';

        const convertedDateRange = dateRange.map((item: any) => timeService.iso8601ToDDMMYYY(item));

        if (convertedDateRange.length >= 2) {
            return `${convertedDateRange[0]} - ${convertedDateRange[1]}`;
        }

        return `${convertedDateRange[0]}`;
    }

    // todo: what is this doing?
    const setNativeValue = (element: any, value: string) => {
        // @ts-ignore
        const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
        const prototype = Object.getPrototypeOf(element);
        // @ts-ignore
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

        if (valueSetter && valueSetter !== prototypeValueSetter) {
            // @ts-ignore
            prototypeValueSetter.call(element, value);
        } else {
            // @ts-ignore
            valueSetter.call(element, value);
        }
    };

    const getEvent = (name: string) => {
        return new Event(name, { bubbles: true });
    };

    const dispatchCustomEvent = (element: Node, event: Event) => {
        element.dispatchEvent(event);
    }

    const getInputFromPreset = () => {
        let oneWeekAgo, oneMonthAgo, oneYearAgo;
        switch (preset) {
            case 'today':
                return `${currentDay} - `;
            case 'one-week':
                oneWeekAgo = timeService.getDateFromDaysAgo(6);
                return `${oneWeekAgo} - ${currentDay}`;
            case 'one-month':
                oneMonthAgo = timeService.getDateFromDaysAgo(29);
                return `${oneMonthAgo} - ${currentDay}`;
            case 'one-year':
                oneYearAgo = timeService.getDateFromDaysAgo(364);
                return `${oneYearAgo} - ${currentDay}`;
            default:
                return '';
        }
    };

    useEffect(() => {
        const inputEvent = getEvent('input');
        // @ts-ignore
        const input = datePicker.inputNode;
        const inputValue = getInputFromPreset();

        setNativeValue(input, inputValue);
        dispatchCustomEvent(input, inputEvent);
    }, [preset]);

    return (
        <Form className="DatePickerForm">
            <Grid>
                <Grid.Column width={10}>
                    <DatesRangeInput
                        className="date-picker"
                        name="dateRange"
                        label={{
                            children: "Date Range",
                            htmlFor: "form-select-control-task" }}
                        placeholder="From - To"
                        value={getDateRangeValue()}
                        iconPosition="left"
                        onChange={handleChange}
                        ref={setDatePicker}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Form.Field
                        control={Select}
                        label={{
                            children: "Preset",
                            htmlFor: "form-select-control-task" }}
                        search
                        searchInput={{ id: "form-select-control-task" }}
                        options={ranges}
                        placeholder="Preset"
                        name="preset"
                        clearable
                        onChange={handleChange}
                        value={preset}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerForm);