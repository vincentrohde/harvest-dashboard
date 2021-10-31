// Types
import {ErrorCheckInputProps} from '../ErrorCheckInput.types';
import {ShallowSubmissionEntryInterface} from '@/types/TimeEntry';

export interface HoursProps extends ErrorCheckInputProps {
    hours: ShallowSubmissionEntryInterface['hours'];
}
