// Types
import { FormInputProps } from '../../interfaces/FormInputProps';
import { ShallowTimeEntryInterface } from '../../../../../../interfaces/TimeEntry';

export interface NotesProps extends FormInputProps{
    notes: ShallowTimeEntryInterface['notes'];
}
