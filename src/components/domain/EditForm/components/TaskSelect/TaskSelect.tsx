// Libs
import React from 'react';

// Components
import Select from '@/components/presentation/Select/Select';

// Types
import { TaskSelectProps } from './TaskSelect.types';

const TaskSelect = ({taskId, tasks, handleChange}: TaskSelectProps) => (<Select
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

export default TaskSelect;
