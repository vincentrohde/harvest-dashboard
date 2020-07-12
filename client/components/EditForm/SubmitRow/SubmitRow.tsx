// Typescript

import { ShallowSubmissionEntryInterface } from '../../../../interfaces/TimeEntry';

// Libs

import React from 'react';
import { Form } from 'semantic-ui-react';

// Components

import CancelButton from './CancelButton/CancelButton';
import SubmitButton from './SubmitButton/SubmitButton';

interface SubmitRowProps {
    entry: ShallowSubmissionEntryInterface;
    errorList: string[];
    handleCancel: () => void;
    isNewEntry: boolean;
}

const SubmitRow = ({ handleCancel, entry, errorList, isNewEntry }: SubmitRowProps) => {
    return (
        <Form.Group className="submit-row" widths="equal">
            { !isNewEntry && <CancelButton handleCancel={handleCancel} /> }
            <SubmitButton disabled={
                errorList.length !== 0
                || !entry.hours
                || !entry.project_id
                || !entry.notes
                || !entry.task_id
                || !entry.spent_date
            } />
        </Form.Group>
    );
}

export default SubmitRow;