// Types
import { SemanticInputBasic } from '@/types/components/SemanticInput';
import { groups } from '../../DataOverview.types';

export interface GroupSelectProps extends SemanticInputBasic {
    selectedGroup: string;
    groups: groups;
}
