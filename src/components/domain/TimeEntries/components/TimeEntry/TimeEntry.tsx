// Libs
import React, {useState} from 'react';
import moment from 'moment';
import classNames from 'classnames';

// Services
import apiService from '@/services/ApiService/ApiService';
import timeService from '@/services/TimeService/TimeService';

// Components
import EditForm from '@/components/domain/EditForm/EditForm';
import MetaData from './components/MetaData/MetaData';
import Actions from './components/Actions/Actions';
import Time from './components/Time/Time';

// Types
import {TimeEntryProps} from './TimeEntry.types';

// Stylings
import styles from './TimeEntry.module.scss';

const TimeEntry = ({data, deleteTimeEntry}: TimeEntryProps) => {
    const [isActive, setIsActive] = useState(data.is_running);
    const [isEdit, setIsEdit] = useState(false);
    let {spent_date} = data;
    const {task, project, id, notes, hours} = data;
    const {name: taskName, id: task_id} = task;
    const {id: project_id} = project;
    const hoursAndMinutes = timeService.hoursToHoursAndMinutes(hours);
    spent_date = moment(spent_date).format('DD.MM.YYYY');

    const handleDelete = () => {
        apiService.deleteTimeEntry(id).then(() => deleteTimeEntry(id));
    };

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    };

    const toggleActive = () => {
        setIsActive(!isActive);
    };

    return (
        <div className={classNames(styles.TimeEntry, styles['entry-container'], 'tab-container')}>
            {isEdit ? (
                <EditForm
                    onCancel={() => setIsEdit(false)}
                    onSuccess={() => setIsEdit(false)}
                    data={{
                        id,
                        hours: hoursAndMinutes,
                        notes,
                        spent_date,
                        task_id,
                        project_id,
                    }}
                    setIsEdit={setIsEdit}
                />
            ) : (
                <>
                    <MetaData notes={notes} date={spent_date} task={taskName} />

                    <div className={styles['time-container']}>
                        <Actions handleDelete={handleDelete} toggleEdit={toggleEdit} />
                        <Time
                            isActive={isActive}
                            hoursAndMinutes={hoursAndMinutes}
                            toggleActive={toggleActive}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default TimeEntry;
