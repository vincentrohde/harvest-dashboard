// Types
import { ErrorCheckInputProps } from '../../interfaces/ErrorCheckInputProps';
import { ShallowSubmissionEntryInterface } from '../../../../../../interfaces/TimeEntry';

export interface DateProps extends ErrorCheckInputProps {
    date: ShallowSubmissionEntryInterface['spent_date'];
}
