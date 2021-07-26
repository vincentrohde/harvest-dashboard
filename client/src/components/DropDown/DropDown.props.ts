import { SemanticInputProps } from '../../../interfaces/components/SemanticInput';

export interface DropDownProps extends SemanticInputProps {
    clearable?: boolean;
    options: any;
    searchInputId: string;
}
