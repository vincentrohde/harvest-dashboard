import { onChangeHandler } from '../../../../../interfaces/components/SemanticInput';
import { timeUnit } from '../../../../lib/TimeService/TimeService.types';

export interface DataOverviewProps {
    data: Chart.ChartData;
    onChange: onChangeHandler;
    selectedTimeUnit: timeUnit;
}
