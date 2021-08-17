// Libs
import React from 'react';

// Components
import DropDown from '../../../DropDown/DropDown';

// Types
import { TaskProps } from './Task.props';

const Task = ({taskId, tasks, handleChange}: TaskProps) => (<DropDown
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