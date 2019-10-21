import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import FormError from '../FormError/FormError';

import axios from 'axios';
import moment from 'moment';
import _ from 'underscore';
import Utils from '../../utils/utils';

import { connect } from 'react-redux';
import { updateEditEntry, updateTimeEntry } from '../../stores/actions/timeEntries';
import { editFormOptionsSelector } from '../../stores/selectors/index';

import style from './EditForm.scss';

class EditForm extends Component {
    constructor (props) {
        super();
        this.props = props;
        this.reducers = this.props.reducers;

        this.state = {
            entry: {
                ...this.props.defaults
            }
        };

        this.headersAPI = {
            'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN,
            'Harvest-Account-ID': process.env.ACCOUNT_ID
        };

        this.entryID = this.props.entryID;

        this.setOptionsIfAvailable();

        this.handleChange.bind(this);
    }

    shouldComponentUpdate (nextProps) {
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

        const convertDateForAPI = (inputDate) => {
            return moment(inputDate, 'DD.MM.YYYY').format('YYYY-MM-DD');
        };

        const getHours = () => {
            const hours = Utils.hoursMinutesToHours(this.state.entry.hours);
            return Number(hours);
        };

        const handlePostConversion = () => {
            const isNewEntry = this.props.isNew;

            if (isNewEntry) {
                const headers = {...this.headersAPI, 'Content-Type': 'application/json'};

                axios.post(`${process.env.API_URL}/v2/time_entries`,
                    {...this.state.entry},
                    { headers })
                    .then(function () {
                        that.resetStateToDefault();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                axios.patch(`${process.env.API_URL}/v2/time_entries/${that.entryID}`,
                    {...this.state.entry},
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
        }

        const convertInput = (callback) => {
            const convertedHours = getHours();
            const convertedDate = convertDateForAPI(this.state.entry.spent_date);

            this.setState({
                entry: {
                    hours: convertedHours,
                    spent_date: convertedDate
                }
            }, () => {
                callback();
            })
        };

        convertInput(handlePostConversion);
    }

    handleChange (event, { name, value }) {
        const target = event.target;

        const checkChange = () => {
            if (name === 'hours') {
                const hoursInputRegex = /(^([1-9]?)([0-9])(:)([0-5])([0-9])$)/;
                const input = this.state.entry[name];
                const hoursInputTestPassed = input.match(hoursInputRegex);

                if (!hoursInputTestPassed) {
                    this.setState({
                        ...this.state,
                        error: name
                    }, () => {});
                } else {
                    this.setState({
                        ...this.state,
                        error: ''
                    }, () => {
                        console.log(this.state);
                    });
                }
            }
        }

        const debouncedChangeChecker = _.debounce(checkChange, 500);

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

    convertDataToSelectOptions (list) {
        return list.map(item => {
            return {
                value: item.id,
                text: item.name,
                key: item.id
            }
        })
    }

    render () {
        const tasks = this.tasks;
        const projects = this.projects;

        return (
            <div className="EditForm full">
                { (tasks && projects) && (
                    <Form
                        onSubmit={this.handleSubmit.bind(this)}
                        error
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
                        </Form.Group>

                        <Form.Group>
                            <Form.Field
                                control={Input}
                                label="Notes"
                                placeholder="Notes"
                                name="notes"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.entry.notes}
                                width={12}
                            />
                            <Form.Field
                                control={Input}
                                label="Hours"
                                placeholder="Hours"
                                name="hours"
                                error={this.state.error === "hours"}
                                onChange={this.handleChange.bind(this)}
                                value={this.state.entry.hours}
                                width={4}
                            />
                        </Form.Group>

                        <Form.Group>
                            <DateInput
                                className="submit-btn"
                                name="spent_date"
                                placeholder="Date"
                                label="Date"
                                inlineLabel={false}
                                dateFormat={"DD.MM.YYYY"}
                                value={this.state.entry.spent_date}
                                onChange={this.handleChange.bind(this)}
                            />
                            <Button
                                width={4}
                                size="medium">
                                Submit
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
        options: editFormOptionsSelector(state)
    }
};

const mapDispatchToProps = {
    updateEditEntry,
    updateTimeEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);