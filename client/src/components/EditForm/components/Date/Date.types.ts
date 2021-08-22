// Types
import { ErrorCheckInputProps } from '../ErrorCheckInput.props';
import { ShallowSubmissionEntryInterface } from '../../../../../interfaces/TimeEntry';

export interface DateProps extends ErrorCheckInputProps {
    date: ShallowSubmissionEntryInterface['spent_date'];
}
