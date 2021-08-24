// Types
import { FormInputProps } from '../FormInput.types';
import { ShallowTimeEntryInterface } from '../../../../../interfaces/TimeEntry';

export interface NotesProps extends FormInputProps {
    notes: ShallowTimeEntryInterface['notes'];
}
