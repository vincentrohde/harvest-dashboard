import React, { Component } from 'react';
import { Form, Input, Button, Select, Icon } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import FormError from '../FormError/FormError';
import axios from 'axios';
import _ from 'underscore';
import { TimeHelper } from '../../helpers';
import { connect } from 'react-redux';
import { updateEditEntry, updateTimeEntry } from '../../stores/actions/timeEntries';
import { editFormOptionsSelector } from '../../stores/selectors/index';
import { dateRangeFilterSelector } from '../../stores/selectors/filters';

import style from './EditForm.scss';

class EditForm extends Component {
    constructor (props) {
        super();
        this.props = props;
        this.reducers = this.props.reducers;

        this.state = {
            error: [],
            entry: {
                ...this.props.defaults
            }
        };

        this.headersAPI = {
            'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN,
            'Harvest-Account-ID': process.env.ACCOUNT_ID
        };

        this.entryID = this.props.entryID;
        this.isNewEntry = this.props.isNew;

        this.setOptionsIfAvailable();

        this.handleChange.bind(this);
    }

    shouldComponentUpdate (nextProps) {
        // todo: what is this code doing? more explanation needed

        const oldTasks = this.props.options.activeTasksSelector;
        const newTasks = nextProps.options.activeTasksSelector;

        const oldProjects = this.props.options.activeProjectsSelector;
        const newProjects = nextProps.options.activeProjectsSelector;

        if (!oldTasks && newTasks) {
            this.tasks = this.convertDataToSelectOptions(newTasks);
        }

        if (!oldProjects && newProjects) {
            this.projects = this.convertDataToSelectOptions(newProjects);
        }

        return true;
    }

    setOptionsIfAvailable () {
        const tasks = this.props.options.activeTasksSelector;
        const projects = this.props.options.activeProjectsSelector;

        if (tasks) {
            this.tasks = this.convertDataToSelectOptions(tasks);
        }

        if (projects) {
            this.projects = this.convertDataToSelectOptions(projects);
        }
    }

    resetStateToDefault () {
        this.setState({
            ...this.state,
            error: [],
            entry: {
                ...this.state.entry,
                task_id: '',
                project_id: '',
                notes: '',
                hours: '0:00',
                spent_date: ''
            }
        });
    }

    handleSubmit (event) {
        event.preventDefault();

        const that = this;

        const convertUserInputForAPI = (input) => {
            const inputHours = this.state.entry.hours;
            const inputDate = this.state.entry.spent_date;

            const convertedHours = TimeHelper.hoursAndMinutesToHours(inputHours);
            const convertedDate = TimeHelper.ddMMYYYYToISO8601(inputDate);

            return {
                ...input,
                hours: convertedHours,
                spent_date: convertedDate
            };
        };

        const submitInputDataToHarvestAPI = () => {
            const isNewEntry = this.isNewEntry;
            const userInput = convertUserInputForAPI({...this.state.entry});

            if (isNewEntry) {
                const headers = {...this.headersAPI, 'Content-Type': 'application/json'};

                axios.post(`${process.env.API_URL}/v2/time_entries`,
                    userInput,
                    { headers })
                    .then(function () {
                        that.resetStateToDefault();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                axios.patch(`${process.env.API_URL}/v2/time_entries/${that.entryID}`,
                    userInput,
                    {
                        headers: {...this.headersAPI, 'Content-Type': 'application/json'}
                    })
                    .then(function ({ request }) {
                        if (request.readyState === 4 && request.status === 200) {
                            that.props.updateEditEntry('');

                            axios.get(`${process.env.API_URL}/v2/time_entries/${that.entryID}`, {
                                headers: that.headersAPI
                            })
                                .then(function ({ data }) {
                                    that.props.updateTimeEntry(data);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        };

        submitInputDataToHarvestAPI();
    }

    handleChange (event, { name, value }) {

        const checkChange = () => {
            const hoursInputRegex = /(^([1-9]?)([0-9])(:)([0-5])([0-9])$)/;
            const dateInputRegex = /^[0-9]{2}[.]{1}[0-9]{2}[.]{1}[0-9]{4}$/;

            const removeErrorFromList = (errorList, name) => {
                errorList.forEach((item, index) => {
                    if (item === name) {
                        errorList.splice(index, 1);
                    }
                });
            };

            const regexHandler = (inputName, regex) => {
                const input = this.state.entry[inputName];
                const inputTestPassed = input.match(regex);

                if (!inputTestPassed) {
                    this.setState({
                        ...this.state,
                        error: [...this.state.error, name]
                    }, () => {});
                } else {
                    let errorList = [...this.state.error];

                    removeErrorFromList(errorList, name);

                    this.setState({
                        ...this.state,
                        error: errorList
                    }, () => {
                        console.log(this.state);
                    });
                }
            }

            if (name === 'hours') {
                regexHandler(name, hoursInputRegex);
            }

            if (name === 'spent_date') {
                regexHandler(name, dateInputRegex);
            }
        }

        const debouncedChangeChecker = _.debounce(checkChange, 2000);

        this.setState({
            ...this.state,
            entry: {
                ...this.state.entry,
                [name]: value
            }
        }, () => {
            debouncedChangeChecker();
        });
    }

    handleCancel () {
        if (!this.isNewEntry) {
            this.props.updateEditEntry('');
        }
    }

    convertDataToSelectOptions (list) {
        return list.map(item => {
            return {
                value: item.id,
                text: item.name,
                key: item.id
            }
        })
    }

    isNameInErrorList (name) {
        const errorList = this.state.error;
        return errorList.includes(name);
    }

    getDateFromDateFilter () {
        if (this.props.dateRange.length) {
            let dateRange = this.props.dateRange;
            dateRange = dateRange.map(item => TimeHelper.iso8601ToDDMMYYY(item));

            return `${dateRange[0]}`
        }

        return false;
    }

    render () {
        const tasks = this.tasks;
        const projects = this.projects;

        this.entryDate = this.state.entry.spent_date ?
            this.state.entry.spent_date :
            this.getDateFromDateFilter();

        return (
            <div className="EditForm full">
                { (tasks && projects) && (
                    <Form
                        onSubmit={this.handleSubmit.bind(this)}
                        error={this.state.error.length != '0'}
                        autoComplete="off"
                    >
                        <FormError error={this.state.error}/>
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Select}
                                label={{ children: "Task", htmlFor: "form-select-control-task" }}
                                search
                                searchInput={{ id: "form-select-control-task" }}
                                options={tasks}
                                placeholder="Task"
                                name="task_id"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.entry.task_id}
                            />
                            <Form.Field
                                control={Select}
                                label={{ children: "Project", htmlFor: "form-select-control-task" }}
                                search
                                searchInput={{ id: "form-select-control-task" }}
                                options={projects}
                                placeholder="Project"
                                name="project_id"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.entry.project_id}
                            />
                            <DateInput
                                className="submit-btn"
                                name="spent_date"
                                placeholder="Date"
                                label="Date"
                                inlineLabel={false}
                                dateFormat={"DD.MM.YYYY"}
                                value={this.entryDate}
                                error={this.isNameInErrorList('spent_date')}
                                onChange={this.handleChange.bind(this)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Field
                                className="form-input"
                                control={Input}
                                label="Notes"
                                placeholder="Notes"
                                name="notes"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.entry.notes}
                                width={12}
                            />
                            <Form.Field
                                className="form-input"
                                control={Input}
                                label="Hours"
                                placeholder="Hours"
                                name="hours"
                                error={this.isNameInErrorList('hours')}
                                onChange={this.handleChange.bind(this)}
                                value={this.state.entry.hours}
                                width={4}
                            />
                        </Form.Group>

                        <Form.Group className="submit-row" widths="equal">
                            { !this.isNewEntry && (
                                <Button
                                    className="cancel-button js-cancel"
                                    width={5}
                                    size="medium"
                                    type="button"
                                    onClick={this.handleCancel.bind(this)}
                                >
                                    <Icon name="undo" /> Cancel
                                </Button>
                            )}
                            <Button
                                className="submit-button js-submit"
                                width={5}
                                size="medium"
                                primary
                                disabled={
                                    this.state.error.length != '0' ||
                                    !this.state.entry.hours ||
                                    !this.state.entry.project_id ||
                                    !this.state.entry.task_id ||
                                    !this.state.entry.notes ||
                                    !this.state.entry.spent_date
                                }
                            >
                                <Icon name="send" /> Submit
                            </Button>
                        </Form.Group>
                    </Form>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        options: editFormOptionsSelector(state),
        dateRange: dateRangeFilterSelector(state)
    }
};

const mapDispatchToProps = {
    updateEditEntry,
    updateTimeEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);