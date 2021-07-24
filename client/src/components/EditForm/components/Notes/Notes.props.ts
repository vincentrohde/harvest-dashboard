// Types
import { FormInputProps } from '../FormInput.props';
import { ShallowTimeEntryInterface } from '../../../../../interfaces/TimeEntry';

export interface NotesProps extends FormInputProps{
    notes: ShallowTimeEntryInterface['notes'];
}
