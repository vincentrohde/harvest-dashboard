// Types
import {SemanticInputBasic} from '@/types/SemanticInput';
import {timeUnit} from '@/services/TimeService/TimeService.types';

export interface TimeUnitSelectProps extends SemanticInputBasic {
    selectedTimeUnit: timeUnit;
}
