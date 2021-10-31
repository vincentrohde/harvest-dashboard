// Types
import {FormInputProps} from '../FormInput.types';
import {ShallowSubmissionEntryInterface} from '@/types/TimeEntry';
import {SelectOptionsList} from '@/services/SemanticUiService/SemanticUiService';

export interface TaskSelectProps extends FormInputProps {
    taskId: ShallowSubmissionEntryInterface['task_id'];
    tasks: SelectOptionsList;
}
