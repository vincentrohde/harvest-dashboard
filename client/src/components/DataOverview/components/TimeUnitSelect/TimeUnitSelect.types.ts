// Types
import { SemanticInputBasic } from '../../../../../interfaces/components/SemanticInput';
import { timeUnit } from '../../../../lib/TimeService/TimeService.types';

export interface TimeUnitSelectProps extends SemanticInputBasic {
    selectedTimeUnit: timeUnit;
}
