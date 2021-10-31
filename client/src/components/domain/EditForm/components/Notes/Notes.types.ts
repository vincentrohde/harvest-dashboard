// Types
import {FormInputProps} from '../FormInput.types';
import {ShallowTimeEntryInterface} from '@/types/TimeEntry';

export interface NotesProps extends FormInputProps {
    notes: ShallowTimeEntryInterface['notes'];
}
