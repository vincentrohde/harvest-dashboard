// Types
import { FormInputProps } from '../FormInput.types';
import { ShallowSubmissionEntryInterface } from '../../../../types/TimeEntry';
import { SelectOptionsList } from '@/services/SemanticUiService/SemanticUiService';

export interface ProjectProps extends FormInputProps {
    projectId: ShallowSubmissionEntryInterface['project_id'];
    projects: SelectOptionsList;
}
