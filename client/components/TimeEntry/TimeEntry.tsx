import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import EditForm from '../EditForm/EditForm';

// Redux
import { connect } from 'react-redux';
import { deleteTimeEntry } from '../../stores/actions/timeEntries';

// Services
import { backendService } from '../../lib/BackendService/BackendService';
import { timeService } from '../../lib/TimeService/TimeService';

import style from './TimeEntry.scss';

const TimeEntry = ({hours, id, isRunning, notes, task, date, project, deleteTimeEntry }) => {
    const [isActive, setIsActive] = useState(isRunning);
    const [isEdit, setIsEdit] = useState(false);
    const {name: taskName, id: taskId} = task;
    const {id: projectId} = project;
    date = moment(date).format('DD.MM.YYYY');
    hours = timeService.hoursToHoursAndMinutes(hours);

    const handleClick = ({target}) => {
        if (target.classList.contains('js-edit')) {
            setIsEdit(!isEdit);
        }

        if (target.classList.contains('js-delete')) {
            backendService.deleteTimeEntry(id)
                .then(() => deleteTimeEntry(id));
        }

        if (target.classList.contains('js-toggle-active')) {
            setIsActive(!isActive);
        }
    };

    return (
        <div className="TimeEntry entry-container tab-container">
            {isEdit
                ? <EditForm
                    isNewEntry={false}
                    entryData={{id, hours, notes, date, taskId, projectId}}
                    toggleEditMode={setIsEdit} />
                : (<>
                    <div className="meta-data-container">
                        <p className="meta-data pipes">
                            <span className="category">{taskName}</span>
                            <span>{date}</span>
                        </p>
                        <h3 className="title">{notes}</h3>
                    </div>
                    <div className="time-container" onClick={handleClick}>
                        <div className="actions-header">
                            <Icon className="delete js-delete" name="trash alternate"/>
                            <Icon className="edit js-edit" name="pencil"/>
                        </div>
                        <h3 className="time">
                            <Icon className="js-toggle-active"
                                  name={`clock${isActive ? '' : ' outline'}`}/>
                            {hours}
                        </h3>
                    </div>
                </>)
            }
        </div>
    )
}

const mapDispatchToProps = {deleteTimeEntry};

export default connect(null, mapDispatchToProps)(TimeEntry);