// Typescript
import { TimeEntryInterface } from '../../../interfaces/TimeEntry';

// Libs
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

// Stylings
import './TimeEntry.scss';

interface TimeEntryProps extends TimeEntryInterface {
    deleteTimeEntry: Function;
}

type ButtonEvent = React.MouseEvent;

const TimeEntry = ({
       hours,
       id,
       is_running,
       notes,
       task,
       spent_date,
       project,
       deleteTimeEntry
    }: TimeEntryProps) => {

    const [ isActive, setIsActive ] = useState(is_running);
    const [ isEdit, setIsEdit ] = useState(false);
    const { name: taskName, id: task_id } = task;
    const { id: project_id } = project;
    const hoursAndMinutes = timeService.hoursToHoursAndMinutes(hours);
    spent_date = moment(spent_date).format('DD.MM.YYYY');

    const handleClick = (event: ButtonEvent) => {
        const target = event.target as HTMLElement;

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
                    entryData={{
                        id,
                        hours: hoursAndMinutes,
                        notes,
                        spent_date,
                        task_id,
                        project_id }}
                    setIsEdit={setIsEdit}/>
                : (<>
                    <div className="meta-data-container">
                        <p className="meta-data pipes">
                            <span className="category">{taskName}</span>
                            <span>{spent_date}</span>
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
                                // @ts-ignore
                                name={`clock${isActive ? '' : ' outline'}`}/>
                            {hoursAndMinutes}
                        </h3>
                    </div>
                </>)
            }
        </div>
    )
}

const mapDispatchToProps = { deleteTimeEntry };

export default connect(null, mapDispatchToProps)(TimeEntry);