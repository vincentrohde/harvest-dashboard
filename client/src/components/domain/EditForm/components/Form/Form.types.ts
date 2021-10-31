// Libs
import React from 'react';

// Types
import { ShallowSubmissionEntryInterface } from '@/types/TimeEntry';
import { SelectOptionsList } from '@/services/SemanticUiService/SemanticUiService';
import { onChangeHandler } from '@/types/SemanticInput';

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
