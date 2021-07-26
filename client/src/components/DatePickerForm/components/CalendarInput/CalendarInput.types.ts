// Libs
import { DatesRangeInput } from 'semantic-ui-calendar-react';

// Types
import { onChangeHandler } from '../../../../../interfaces/components/SemanticInput';

export type setRef = (element: DatesRangeInput) => void;

export interface CalendarInputProps {
    value: string;
    setRef?: setRef | null;
    onChange: onChangeHandler;
}
