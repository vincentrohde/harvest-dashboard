import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Grid, Select } from 'semantic-ui-react';
import moment from 'moment';

import { TimeHelper } from '../../helpers';

import {
    DatesRangeInput
} from 'semantic-ui-calendar-react';

import { updateDateRange } from '../../stores/actions/filters';
import { dateRangeFilterSelector } from '../../stores/selectors/filters';

class DatePickerForm extends Component {
    constructor (props) {
        super();
        this.props = props;
        this.datePicker = false;
        this.ranges = [
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

        this.state = {
            dateRange: this.props.dateRange,
            preset: ''
        };
    }

    handleChange (event, {name, value}) {
        let dates;
        let stateCallback;
        if (value.length) {
            dates = this.getArrayFromDateRangeInput(value);
            dates = dates.map(item => TimeHelper.ddMMYYYYToISO8601(item));
            stateCallback = () => {
                this.props.updateDateRange(this.state.dateRange)
            };
        } else {
            dates = value;
            stateCallback = () => {};
        }

        this.setState({
            ...this.state,
            preset: this.setPreset ? this.state.preset : '',
            [name]: dates
        }, () => {
            stateCallback();
        });

        this.setPreset = false;
    }

    getArrayFromDateRangeInput (input) {
        const cleanDateInputFormat = (dateList) => {
            const hyphenRegex = /-/g;
            return dateList.map(item => item.replace(hyphenRegex, '.'));
        };

        const dateRegex = /(([0-9]{2})(-)([0-9]{2})(-)([0-9]{4}))/g;
        const matches = input.match(dateRegex);

        return cleanDateInputFormat(matches);
    }

    getDateRangeValue () {
        if (this.state.dateRange.length) {
            let dateRange = this.state.dateRange;
            dateRange = dateRange.map(item => TimeHelper.iso8601ToDDMMYYY(item));

            if (dateRange.length >= 2) {
                return `${dateRange[0]} - ${dateRange[1]}`;
            }

            return `${dateRange[0]}`
        } else {
            return this.state.dateRange
        }
    }

    setInputToCurrentDate (ev, {value}) {
        const event = new Event('input', { bubbles: true });
        const input = this.datePicker.inputNode;
        const currentDay = moment().format('DD-MM-YYYY');
        let inputValue, oneWeekAgo, oneMonthAgo, oneYearAgo;
        this.setPreset = true;

        this.setState({
            ...this.state,
            preset: value
        }, () => {
            switch (value) {
                case 'today':
                    inputValue = `${currentDay} - `;
                    break;
                case 'one-week':
                    oneWeekAgo = moment().subtract(6,'days').format('DD-MM-YYYY');
                    inputValue = `${oneWeekAgo} - ${currentDay}`;
                    break;
                case 'one-month':
                    oneMonthAgo = moment().subtract(29,'days').format('DD-MM-YYYY');
                    inputValue = `${oneMonthAgo} - ${currentDay}`;
                    break;
                case 'one-year':
                    oneYearAgo = moment().subtract(364,'days').format('DD-MM-YYYY');
                    inputValue = `${oneYearAgo} - ${currentDay}`;
                    break;
                default:
                    return;
            }

            this.setNativeValue(input, inputValue);
            input.dispatchEvent(event);
        });
    }

    // todo: what is this doing?
    setNativeValue (element, value) {
        const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
        const prototype = Object.getPrototypeOf(element);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

        if (valueSetter && valueSetter !== prototypeValueSetter) {
            prototypeValueSetter.call(element, value);
        } else {
            valueSetter.call(element, value);
        }
    };

    render () {
        return (
            <Form
                className="DatePickerForm"
            >
                <Grid>
                    <Grid.Column width={10}>
                        <DatesRangeInput
                            className="date-picker"
                            name="dateRange"
                            label={{ children: "Date Range", htmlFor: "form-select-control-task" }}
                            placeholder="From - To"
                            value={this.getDateRangeValue()}
                            iconPosition="left"
                            onChange={this.handleChange.bind(this)}
                            ref={(element) => { this.datePicker = element; }}
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Form.Field
                            control={Select}
                            label={{ children: "Preset", htmlFor: "form-select-control-task" }}
                            search
                            searchInput={{ id: "form-select-control-task" }}
                            options={this.ranges}
                            placeholder="Preset"
                            name="preset"
                            clearable
                            onChange={this.setInputToCurrentDate.bind(this)}
                            value={this.state.preset}
                        />
                    </Grid.Column>
                </Grid>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
        dateRange: dateRangeFilterSelector(state)
    }
};

const mapDispatchToProps = {
    updateDateRange
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerForm);