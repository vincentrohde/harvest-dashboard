// Libs
import React from 'react';

// Components
import DropDownInput from '../../../DropDownInput/DropDownInput';

// Types
import { TaskProps } from './TaskProps';

const Task = ({taskId, tasks, handleChange}: TaskProps) => (<DropDownInput
    label={{
        children: "Task",
        htmlFor: "form-select-control-task"
    }}
    searchInputId={"form-select-control-task"}
    options={tasks}
    placeholder="Task"
    name="task_id"
    onChange={handleChange}
    value={taskId}
/>);

export default Task;
