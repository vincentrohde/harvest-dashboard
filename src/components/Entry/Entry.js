import React from 'react';
import moment from 'moment';

import style from './Entry.scss';

const Entry = (props) => {
    const { information } = props;
    const date = moment(information.created_at).format('DD.MM.YYYY');

    const hoursToHoursMinutes = (hours) => {
        const totalMinutes = hours * 60;

        const convertedHours = Math.floor(totalMinutes / 60);
        let convertedMinutes = Math.floor(totalMinutes % 60);

        if (convertedMinutes.toString().length == 1) {
            convertedMinutes = '0' + convertedMinutes;
        }

        return `${convertedHours}:${convertedMinutes}`;
    }

    const hours = hoursToHoursMinutes(information.hours);

    console.log('### information: ', information);
    console.log('### date: ', date);

    return (
        <div className="Entry tab-container">
            <div className="meta-data-container">
                <p className="meta-data">
                    <span className="category">{ information.task.name }</span>
                    <span>{ information.user.name }</span>
                </p>
                <h3 className="title">{ information.notes }</h3>
            </div>
            <div className="time-container">
                <p className="date">{ date }</p>
                <h3 className="time">{ hours }</h3>
            </div>
        </div>
    );
};

export default Entry;