// Types
import { ErrorCheckInputProps } from '../../interfaces/ErrorCheckInputProps';
import { ShallowSubmissionEntryInterface } from '../../../../../../interfaces/TimeEntry';

export interface HoursProps extends ErrorCheckInputProps {
    hours: ShallowSubmissionEntryInterface['hours'];
}
