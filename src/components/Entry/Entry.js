import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import { timeService } from '../../lib/TimeService/TimeService';
import EditForm from '../EditForm/EditForm';
import { apiService } from '../../lib/ApiService/ApiService';

import style from './Entry.scss';

class Entry extends Component {
    constructor (props) {
        super();
        this.props = props;

        this.isEdit = this.props.isEdit || false;
        this.isNew = this.props.isNew || false;

        if (this.isNew) {
            this.id = 0;
            this.defaults = this.getObjectForDefaults();
        } else {
            this.information = this.props.information;

            this.id = this.information.id;

            this.activeInterval = 2000;

            this.date = moment(this.information.spent_date).format('DD.MM.YYYY');
            this.hours = timeService.hoursToHoursAndMinutes(this.information.hours);

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
                hours: timeService.hoursToHoursAndMinutes(information.hours),
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

        apiService.getTimeEntry(that.id)
            .then(({ data }) => {
                that.props.updateTimeEntry(data);
                that.handleActiveInterval();
            });
    };

    render () {
        const information = this.props.information;

        if (!this.isNew) {
            this.hours = timeService.hoursToHoursAndMinutes(this.props.information.hours);
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
                            <div className="actions-header">
                                <p className="delete">
                                    <Icon name="trash alternate" />
                                </p>
                                <p className="edit">
                                    <Icon name="pencil" />
                                </p>
                            </div>
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