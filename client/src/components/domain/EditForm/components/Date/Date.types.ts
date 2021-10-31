// Types
import {ErrorCheckInputProps} from '../ErrorCheckInput.types';
import {ShallowSubmissionEntryInterface} from '@/types/TimeEntry';

export interface DateProps extends ErrorCheckInputProps {
    date: ShallowSubmissionEntryInterface['spent_date'];
}
