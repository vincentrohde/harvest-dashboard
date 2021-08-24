// Types
import { ErrorCheckInputProps } from '../ErrorCheckInput.types';
import { ShallowSubmissionEntryInterface } from '../../../../../interfaces/TimeEntry';

export interface HoursProps extends ErrorCheckInputProps {
    hours: ShallowSubmissionEntryInterface['hours'];
}
