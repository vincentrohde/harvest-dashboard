import {ShallowSubmissionEntryInterface, TimeEntrySubmissionInterface} from '@/types/TimeEntry';

export interface EditFormEntry extends ShallowSubmissionEntryInterface {
    id?: number;
    hours: string;
    project_id: TimeEntrySubmissionInterface['project_id'] | string;
    task_id: TimeEntrySubmissionInterface['task_id'] | string;
}

export interface EditFormProps {
    data?: EditFormEntry;
    options?: any;
    setIsEdit?: (isEdit: boolean) => void;
    onSuccess?: () => void;
    onCancel?: () => void;
    addTimeEntry?: Function;
    updateTimeEntry?: Function;
}
