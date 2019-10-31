import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Grid, Button, Icon } from 'semantic-ui-react';
import moment from 'moment';
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

        this.state = {
            dateRange: this.props.dateRange
        };
    }

    handleChange (event, {name, value}) {
        let dates;
        let stateCallback;
        if (value.length) {
            dates = this.getArrayFromDateRangeInput(value);
            dates = dates.map(item => this.ddMMYYYYToISO8601(item));
            stateCallback = () => {
                this.props.updateDateRange(this.state.dateRange)
            };
        } else {
            dates = value;
            stateCallback = () => {};
        }

        this.setState({
            ...this.state,
            [name]: dates
        }, () => {
            stateCallback();
        });
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

    iso8601ToDDMMYYY (date) {
        const isDDMMYYYY = moment(date, 'DD.MM.YYYY').format('DD.MM.YYYY') === date;

        if (isDDMMYYYY) {
            return date;
        }

        return moment(date).format('DD.MM.YYYY');
    }

    ddMMYYYYToISO8601 (date) {
        const isISO8601 = moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD') === date;

        if (isISO8601) {
            return date;
        }

        return moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD');
    }

    getDateRangeValue () {
        if (this.state.dateRange.length) {
            let dateRange = this.state.dateRange;
            dateRange = dateRange.map(item => this.iso8601ToDDMMYYY(item));

            if (dateRange.length >= 2) {
                return `${dateRange[0]} - ${dateRange[1]}`;
            }

            return `${dateRange[0]}`
        } else {
            return this.state.dateRange
        }
    }

    setInputToCurrentDate () {

        const e = new Event('input', { bubbles: true });
        const input = document.querySelector('.date-picker input');
        this.setNativeValue(input, `${moment().format('DD-MM-YYYY')} - `);
        input.dispatchEvent(e);
    }

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
                    <Grid.Column width={12}>
                        <DatesRangeInput
                            className="date-picker"
                            name="dateRange"
                            placeholder="From - To"
                            value={this.getDateRangeValue()}
                            iconPosition="left"
                            onChange={this.handleChange.bind(this)}
                            ref={(element) => { this.datePicker = element; }}
                        />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button
                            className="today-button full"
                            size="medium"
                            primary
                            onClick={this.setInputToCurrentDate.bind(this)}
                        >
                            <Icon name="thumbtack" /> Today
                        </Button>
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