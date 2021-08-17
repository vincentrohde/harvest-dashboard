import { onChangeHandler } from '../../../../../interfaces/components/SemanticInput';
import { timeUnit } from '../../../../lib/TimeService/TimeService.types';
import { group } from '../../DataOverviewContainer.types';

export interface FormProps {
    handleTimeUnitSelect: onChangeHandler;
    handleGroupSelect: onChangeHandler;
    selectedGroup: group;
    selectedTimeUnit: timeUnit;
}
