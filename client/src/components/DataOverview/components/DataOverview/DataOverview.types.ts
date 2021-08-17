import { onChangeHandler } from '../../../../../interfaces/components/SemanticInput';
import { timeUnit } from '../../../../lib/TimeService/TimeService.types';
import { group } from '../../DataOverviewContainer.types';

export interface DataOverviewProps {
    data: Chart.ChartData;
    handleTimeUnitSelect: onChangeHandler;
    handleGroupSelect: onChangeHandler;
    selectedGroup: group;
    selectedTimeUnit: timeUnit;
}
