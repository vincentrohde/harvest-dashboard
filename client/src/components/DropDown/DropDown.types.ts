import { SemanticInputProps } from '../../types/components/SemanticInput';
import { SemanticWIDTHS } from 'semantic-ui-react/dist/commonjs/generic';

export interface DropDownTypes extends SemanticInputProps {
    clearable?: boolean;
    options: any;
    searchInputId: string;
    width?: SemanticWIDTHS;
}
