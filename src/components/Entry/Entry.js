import React, { Component } from 'react';

import axios from "axios";
import moment from 'moment';
import Select from 'react-select';

// state related imports

import { connect } from 'react-redux';
import { updateTimeEntry } from '../../stores/actions/timeEntries';

import style from './Entry.scss';

class Entry extends Component {
    constructor (props) {
        super();
        this.props = props;
        this.information = this.props.information;

        this.isEdit = this.props.isEdit;
        this.id = this.information.id;

        this.state = {
            task_id: this.information.task.id,
            project_id: this.information.project.id,
            notes: this.information.notes,
            hours: this.information.hours,
            spent_date: this.information.spent_date
        };

        this.headersAPI = {
            "Authorization": "Bearer " + process.env.ACCESS_TOKEN,
            "Harvest-Account-ID": process.env.ACCOUNT_ID
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.activeInterval = 20000;
        this.date = moment(this.information.created_at).format('DD.MM.YYYY');
        this.hours = this.hoursToHoursMinutes(this.information.hours);

        this.initializeActiveInterval();
    }

    shouldComponentUpdate(nextProps) {
        const wasEdit = this.props.isEdit;
        const willEdit = nextProps.isEdit;
        this.isEdit = willEdit;

        if (!wasEdit && willEdit) {

            const tasks = this.filterInactiveData(nextProps.tasks.tasks);
            const projects = this.filterInactiveData(nextProps.projects.projects);

            this.tasks = this.convertDataToSelectOptions(tasks);
            this.projects = this.convertDataToSelectOptions(projects);
        }

        return true;
    }

    handleSubmit (event) {
        event.preventDefault();

        const that = this;
        axios.patch(`${process.env.API_URL}/v2/time_entries/${that.id}`, {...this.state}, {
            headers: {...this.headersAPI, 'Content-Type': 'application/json'}
        })
            .then(function (response) {
                console.log('### response: ', response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChange ({ value }, { name }) {
        this.setState({
            [name]: value
        }, () => {});
    }

    handleInputChange (event) {
        this.setState({
            notes: event.target.value
        }, () => {});
    }

    filterInactiveData (list = []) {
        return list.filter(item => item.isActive === true);
    }

    initializeActiveInterval () {
        this.isActive = this.props.information.is_running;

        if (this.isActive) {
            const that = this;

            this.activeEntryTimeInterval = setInterval(() => {
                that.getCurrentEntryTime();
            }, this.activeInterval);
        }
    }

    handleActiveInterval () {
        this.isActive = this.props.information.is_running;

        if (!this.isActive && this.activeEntryTimeInterval) {
            clearInterval(this.activeEntryTimeInterval);
        }
    }

    hoursToHoursMinutes (hours) {
        const totalMinutes = hours * 60;

        const convertedHours = Math.floor(totalMinutes / 60);
        let convertedMinutes = Math.floor(totalMinutes % 60);

        if (convertedMinutes.toString().length == 1) {
            convertedMinutes = '0' + convertedMinutes;
        }

        return `${convertedHours}:${convertedMinutes}`;
    };

    getCurrentEntryTime () {
        const that = this;
        axios.get(`${process.env.API_URL}/v2/time_entries/${that.id}`, {
            headers: this.headersAPI
        })
            .then(function ({ data }) {
                that.props.updateTimeEntry(data);
                that.handleActiveInterval();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    convertDataToSelectOptions (list) {
        return list.map(item => {
            return {
                value: item.id,
                label: item.name
            }
        })
    }

    render () {
        const information = this.information;
        this.hours = this.hoursToHoursMinutes(this.props.information.hours);
        this.isActive = this.props.information.is_running;

        return (
            <div
                className={
                    `Entry tab-container
                    ${this.isActive ? ' active' : ''}
                    ${this.isEdit ? 'edit' : ''}
                    `
                }
                data-id={information.id}
            >
                { this.isEdit && (
                    <div className="entry-container">
                        <form
                            className="edit-form"
                            action="post"
                            onSubmit={this.handleSubmit}
                        >
                            <Select
                                defaultValue={{
                                    value: information.task.id,
                                    label: information.task.name
                                }}
                                name="task_id"
                                onChange={this.handleChange}
                                className="edit-task"
                                options={this.tasks} />
                            <Select
                                defaultValue={{
                                    value: information.project.id,
                                    label: information.project.name
                                }}
                                name="project_id"
                                onChange={this.handleChange}
                                className="edit-project"
                                options={this.projects}
                            />
                            <input
                                type="text"
                                name="notes"
                                onChange={this.handleInputChange.bind(this)}
                                className="edit-notes"
                                defaultValue={this.information.notes}
                            />
                            <input type="submit" className="edit-submit" value="Submit" />
                        </form>
                    </div>
                )}
                { !this.isEdit && (
                    <div className="entry-container">
                        <div className="meta-data-container">
                            <p className="meta-data pipes">
                                <span className="category">{ information.task.name }</span>
                                <span>{ information.user.name }</span>
                            </p>
                            <h3 className="title">{ information.notes }</h3>
                        </div>
                        <div className="time-container">
                            <p className="date">{ this.date }</p>
                            <p className="edit">Edit</p>
                            <h3 className="time">{ this.hours }</h3>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        ...state
    }
};

const mapDispatchToProps = { updateTimeEntry };

export default connect(mapStateToProps, mapDispatchToProps)(Entry);