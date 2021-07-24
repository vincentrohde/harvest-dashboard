// Types
import { ErrorCheckInputProps } from '../ErrorCheckInput.props';
import { ShallowSubmissionEntryInterface } from '../../../../../interfaces/TimeEntry';

export interface HoursProps extends ErrorCheckInputProps {
    hours: ShallowSubmissionEntryInterface['hours'];
}
