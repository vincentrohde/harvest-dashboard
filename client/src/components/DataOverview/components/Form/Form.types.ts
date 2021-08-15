import { onChangeHandler } from '../../../../../interfaces/components/SemanticInput';
import { timeUnit } from '../../../../lib/TimeService/TimeService.types';

export interface FormProps {
    onChange: onChangeHandler;
    selectedTimeUnit: timeUnit;
}
