// Types
import { FormInputProps } from '../FormInput.props';
import { ShallowSubmissionEntryInterface } from '../../../../../interfaces/TimeEntry';
import { SelectOptionsList } from '../../../../lib/SemanticUiService/SemanticUiService';

export interface ProjectProps extends FormInputProps {
    projectId: ShallowSubmissionEntryInterface['project_id'];
    projects: SelectOptionsList;
}
