// Libs
import React from 'react';

// Types
import { ShallowSubmissionEntryInterface } from '../../../../../interfaces/TimeEntry';
import { SelectOptionsList } from '../../../../lib/SemanticUiService/SemanticUiService';
import { onChangeHandler } from '../../../../../interfaces/components/SemanticInput';

export interface FormProps {
    entry: ShallowSubmissionEntryInterface;
    errorList: string[];
    isFieldInErrorList: (arg: string) => boolean;
    isNewEntry: boolean;
    tasks: SelectOptionsList;
    projects: SelectOptionsList;
    onCancel: () => void;
    onChange: onChangeHandler;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
