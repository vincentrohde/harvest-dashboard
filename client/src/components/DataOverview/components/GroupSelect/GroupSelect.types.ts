// Types
import { SemanticInputBasic } from '../../../../../interfaces/components/SemanticInput';
import { group } from '../../DataOverviewContainer.types';

export interface GroupSelectProps extends SemanticInputBasic {
    selectedGroup: string;
    groups: group[];
}
