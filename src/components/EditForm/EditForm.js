import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import axios from "axios";
import moment from 'moment';

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
            ...this.props.defaults
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
            task_id: '',
            project_id: '',
            notes: '',
            hours: '',
            spent_date: ''
        });
    }

    handleSubmit (event) {
        event.preventDefault();
        const that = this;
        const convertDateForAPI = (inputDate) => {
            return moment(inputDate, 'DD.MM.YYYY').format('YYYY-MM-DD');
        };

        if (this.props.isNew) {
            const headers = {...this.headersAPI, 'Content-Type': 'application/json'};
            const date = convertDateForAPI(this.state.spent_date);

            const data = {
                project_id: this.state.project_id,
                task_id: this.state.task_id,
                spent_date: date,
                hours: Number(this.state.hours),
                notes: this.state.notes
            };

            console.log('### data: ', data);

            axios.post(`${process.env.API_URL}/v2/time_entries`,
                data,
                { headers })
                .then(function () {
                    that.resetStateToDefault();
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            axios.patch(`${process.env.API_URL}/v2/time_entries/${that.entryID}`,
                {...this.state},
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

    handleChange (event, { name, value }) {
        this.setState({
            [name]: value
        }, () => {});
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

        console.log('this.props.isNew: ', this.props.isNew);

        return (
            <div className="EditForm">
                { (tasks && projects) && (
                    <Form
                        onSubmit={this.handleSubmit.bind(this)}
                    >
                        <Form.Group widths="equal">
                            <Form.Field
                                control={Select}
                                label={{ children: 'Task', htmlFor: 'form-select-control-task' }}
                                search
                                searchInput={{ id: 'form-select-control-task' }}
                                options={tasks}
                                placeholder="Task"
                                name="task_id"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.task_id}
                            />
                            <Form.Field
                                control={Select}
                                label={{ children: 'Project', htmlFor: 'form-select-control-task' }}
                                search
                                searchInput={{ id: 'form-select-control-task' }}
                                options={projects}
                                placeholder="Project"
                                name="project_id"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.project_id}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Field
                                control={Input}
                                label="Notes"
                                placeholder="Notes"
                                name="notes"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.notes}
                                width={12}
                            />
                            <Form.Field
                                control={Input}
                                label="Hours"
                                placeholder="Hours"
                                name="hours"
                                onChange={this.handleChange.bind(this)}
                                value={this.state.hours}
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
                                dateFormat={'DD.MM.YYYY'}
                                value={this.state.spent_date}
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