import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

import axios from 'axios';
import moment from 'moment';
import Utils from '../../utils/utils';

import EditForm from '../EditForm/EditForm';

import style from './Entry.scss';

class Entry extends Component {
    constructor (props) {
        super();
        this.props = props;

        this.isEdit = this.props.isEdit;
        this.isNew = this.props.isNew;

        if (this.isNew) {
            this.id = 0;
            this.defaults = this.getObjectForDefaults();
        } else {
            this.information = this.props.information;

            this.id = this.information.id;

            this.headersAPI = {
                "Authorization": "Bearer " + process.env.ACCESS_TOKEN,
                "Harvest-Account-ID": process.env.ACCOUNT_ID
            };

            this.activeInterval = 2000;

            this.date = moment(this.information.spent_date).format('DD.MM.YYYY');
            this.hours = Utils.hoursToHoursMinutes(this.information.hours);

            this.defaults = this.getObjectForDefaults(this.information);

            this.initializeActiveEntryInterval();
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    shouldComponentUpdate (nextProps) {

        this.updateDefaultsOnRerender(nextProps);

        return true;
    }

    updateDefaultsOnRerender (nextProps) {
        const { information } = nextProps;
        this.defaults = this.getObjectForDefaults(information);
    }

    getObjectForDefaults (information) {
        let defaults = {};

        if (!information) {
            defaults = {
                task_id: '',
                project_id: '',
                notes: '',
                hours: '0:00',
                spent_date: ''
            }
        } else {
            defaults = {
                task_id: information.task.id,
                project_id: information.project.id,
                notes: information.notes,
                hours: Utils.hoursToHoursMinutes(information.hours),
                spent_date: moment(information.spent_date).format('DD.MM.YYYY')
            }
        }

        return defaults;
    }

    initializeActiveEntryInterval () {
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

    getCurrentEntryTime () {
        const that = this;
        axios.get(`${process.env.API_URL}/v2/time_entries/${that.id}`, {
            headers: this.headersAPI
        })
            .then(function ({ data }) {
                that.props.reducers.updateTimeEntry(data);
                that.handleActiveInterval();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render () {
        const information = this.props.information;

        if (!this.isNew) {
            this.hours = Utils.hoursToHoursMinutes(this.props.information.hours);
            this.isActive = this.props.information.is_running;
        }

        return (
            <div
                className={
                    `Entry tab-container
                    ${this.isActive ? ' active' : ''}
                    ${this.props.isEdit ? 'edit' : ''}
                    `
                }
                data-id={information ? information.id : 0}
            >
                { this.props.isEdit && (
                    <div className="entry-container">
                        <EditForm
                            defaults={this.defaults}
                            entryID={this.id}
                            isNew={this.props.isNew}
                        />
                    </div>
                )}
                { !this.props.isEdit && (
                    <div className="entry-container">
                        <div className="meta-data-container">
                            <p className="meta-data pipes">
                                <span className="category">{ information.task.name }</span>
                                <span>{ this.date }</span>
                            </p>
                            <h3 className="title">{ information.notes }</h3>
                        </div>
                        <div className="time-container">
                            {/*<p className="date">{ this.date }</p>*/}
                            <p className="edit">
                                <Icon name="pencil" />
                            </p>
                            <h3 className="time">
                                <Icon name={`clock${this.isActive ? '' : ' outline'}`} />
                                { this.hours }
                            </h3>
                        </div>
                    </div>
                )}
            </div>
        );
    }
};

export default Entry;