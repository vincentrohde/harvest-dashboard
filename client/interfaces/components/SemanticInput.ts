export type onChangeHandler = (_event: any, { name, value }:
    { name: string; value: string }) => void;

export interface Label {
    children: string;
    htmlFor: string;
}

export interface SemanticInputBasic {
    onChange: onChangeHandler;
}

export interface SemanticInputProps extends SemanticInputBasic {
    label: Label;
    name: string;
    placeholder: string;
    value: string | number;
}
