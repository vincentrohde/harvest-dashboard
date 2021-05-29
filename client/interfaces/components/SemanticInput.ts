export type onChangeHandler = (_event: any, { name, value }:
    { name: string; value: string }) => void;

export interface Label {
    children: string;
    htmlFor: string;
}

export interface SemanticInputProps {
    label: Label;
    name: string;
    onChange: onChangeHandler;
    placeholder: string;
    value: string | number;
}