// Types
import { SemanticInputBasic } from '../../../../../interfaces/components/SemanticInput';
import { groups } from '../../DataOverview.types';

export interface GroupSelectProps extends SemanticInputBasic {
    selectedGroup: string;
    groups: groups;
}
