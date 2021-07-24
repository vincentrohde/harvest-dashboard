// Types
import { FormInputProps } from '../../interfaces/FormInputProps';
import { ShallowSubmissionEntryInterface } from '../../../../../../interfaces/TimeEntry';
import { SelectOptionsList } from '../../../../../lib/SemanticUiService/SemanticUiService';

export interface ProjectProps extends FormInputProps {
    projectId: ShallowSubmissionEntryInterface['project_id'];
    projects: SelectOptionsList;
}
