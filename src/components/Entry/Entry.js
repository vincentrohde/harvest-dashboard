import React, { Component } from 'react';
import axios from "axios";
import moment from 'moment';

import { connect } from 'react-redux';
import { updateTimeEntry } from '../../stores/actions/timeEntries';

import style from './Entry.scss';

class Entry extends Component {
    constructor (props) {
        super();
        this.props = props;
        this.information = this.props.information;
        this.id = this.information.id;
        this.activeInterval = 20000;
        this.date = moment(this.information.created_at).format('DD.MM.YYYY');
        this.hours = this.hoursToHoursMinutes(this.information.hours);

        this.initializeActiveInterval();
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
            headers: {
                "Authorization": "Bearer " + process.env.ACCESS_TOKEN,
                "Harvest-Account-ID": process.env.ACCOUNT_ID
            }
        })
            .then(function ({ data }) {
                that.props.updateTimeEntry(data);
                that.handleActiveInterval();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render () {
        const information = this.information;
        this.hours = this.hoursToHoursMinutes(this.props.information.hours);
        this.isActive = this.props.information.is_running;

        return (
            <div
                className={`Entry tab-container${this.isActive ? ' active' : ''}`}
                data-id={information.id}
            >
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