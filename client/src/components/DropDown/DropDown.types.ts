import { SemanticInputProps } from '../../../interfaces/components/SemanticInput';

export interface DropDownTypes extends SemanticInputProps {
    clearable?: boolean;
    options: any;
    searchInputId: string;
}
