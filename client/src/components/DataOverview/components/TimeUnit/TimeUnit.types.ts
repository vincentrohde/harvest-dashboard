// Types
import { SemanticInputBasic } from '../../../../../interfaces/components/SemanticInput';
import { timeUnit } from '../../../../lib/TimeService/TimeService.types';

export interface TimeUnitProps extends SemanticInputBasic {
    selectedTimeUnit: timeUnit;
}
