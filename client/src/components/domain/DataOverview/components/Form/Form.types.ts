import { onChangeHandler } from '@/types/SemanticInput';
import { timeUnit } from '@/services/TimeService/TimeService.types';
import { group, groups } from '../../DataOverview.types';

export interface FormProps {
    groups: groups;
    selectedGroup: group;
    selectedTimeUnit: timeUnit;
    handleTimeUnitSelect: onChangeHandler;
    handleGroupSelect: onChangeHandler;
}
