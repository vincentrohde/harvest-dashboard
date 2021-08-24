import { onChangeHandler } from '../../../../types/components/SemanticInput';
import { timeUnit } from '../../../../lib/TimeService/TimeService.types';
import { group, groups } from '../../DataOverview.types';

export interface FormProps {
    groups: groups;
    selectedGroup: group;
    selectedTimeUnit: timeUnit;
    handleTimeUnitSelect: onChangeHandler;
    handleGroupSelect: onChangeHandler;
}
