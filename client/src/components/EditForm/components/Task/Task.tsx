// Libs
import React from 'react';

// Components
import DropDown from '@components/DropDown/DropDown';

// Types
import { TaskProps } from './Task.types';

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
