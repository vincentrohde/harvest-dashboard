import { ShallowSubmissionEntryInterface, TimeEntrySubmissionInterface } from '../../../interfaces/TimeEntry';

export interface EditFormEntry extends ShallowSubmissionEntryInterface {
    id?: number;
    hours: string;
    project_id: TimeEntrySubmissionInterface['project_id'] | string;
    task_id: TimeEntrySubmissionInterface['task_id'] | string;
}

export interface EditFormProps {
    entryData?: EditFormEntry;
    options?: any;
    setIsEdit?: (isEdit: boolean) => void;
    onSuccess?: () => void;
    onCancel?: () => void;
}
