// Libs
import React, { useState } from 'react';

// Components
import Form from './components/Form/Form';

// Redux
import { connect } from 'react-redux';
import { editFormOptionsSelector } from '../../stores/selectors';
import { addTimeEntry, updateTimeEntry } from '../../stores/actions/timeEntries';

// Services
import { semanticUiService } from '../../lib/SemanticUiService/SemanticUiService';
import { backendService } from '../../lib/BackendService/BackendService';
import { timeService } from '../../lib/TimeService/TimeService';
import { apiFormatService } from '../../lib/ApiFormatService/ApiFormatService';

// Data
import { defaultData } from './defaultData';

// Hooks
import { useErrorCheck } from './hooks/useErrorCheck/useErrorCheck';

// Types
import { EditFormProps, EditFormEntry } from './EditForm.props';
import { TimeEntrySubmissionInterface } from '../../../interfaces/TimeEntry';
import { onChangeHandler } from '../../../interfaces/components/SemanticInput';

const EditForm = ({
    entryData,
    options=null,
    onSuccess = () => {},
    onCancel = () => {}
}: EditFormProps) => {

    let id: undefined | EditFormEntry['id'];

    if (typeof entryData === 'undefined') {
        entryData = {...defaultData};
    }

    if (typeof entryData.id !== 'undefined') {
        id = entryData.id;
    }

    const isNewEntry = typeof id === 'undefined';
    const [entry, setEntry] = useState({
        spent_date: timeService.iso8601ToDDMMYYY(entryData.spent_date),
        hours: entryData.hours,
        notes: entryData.notes,
        project_id: entryData.project_id,
        task_id: entryData.task_id,
    });
    const [lastInputChange, setLastInputChange] = useState('');
    const [tasks] = useState(semanticUiService.convertDataToSelectOptions(
        options.tasksSelector
    ));
    const [projects] = useState(semanticUiService.convertDataToSelectOptions(
        options.projectsSelector
    ));

    const errorList = useErrorCheck({ entry, lastInputChange });

    const resetStateToDefault = () => {
        setEntry({
            ...entry,
            ...defaultData
        })
    }

    const isFieldInErrorList = (name: string) => {
        return errorList.includes(name);
    }

    const submitNewEntry = (newEntry: TimeEntrySubmissionInterface) => {
        backendService.addTimeEntry(newEntry)
            .then(({ data }) => {
                addTimeEntry(data);
                resetStateToDefault();
                onSuccess();
            })
            .catch((error) => console.log(error));
    }

    const submitUpdatedEntry = (updatedEntry: TimeEntrySubmissionInterface) => {
        if (typeof id !== "number") { return; }

        backendService.updateTimeEntry(updatedEntry, id)
            .then(({ data: timeEntry }) => {
                updateTimeEntry(timeEntry);
                onSuccess();
            })
            .catch((error) => console.log(error));
    };

    const onChange: onChangeHandler = (_event: any, { name: inputName, value: inputValue }: { name: string, value: string }) => {
        setLastInputChange(inputName);

        setEntry({
            ...entry,
            [inputName]: inputValue
        });
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const convertedEntry = apiFormatService.getTimeEntryInSubmitFormat(entry);

        if (isNewEntry) {
            submitNewEntry(convertedEntry)
            return;
        }

        submitUpdatedEntry(convertedEntry);
    };

    return (
        <Form
            entry={entry}
            errorList={errorList}
            projects={projects}
            tasks={tasks}
            isFieldInErrorList={isFieldInErrorList}
            isNewEntry={isNewEntry}
            onCancel={onCancel}
            onChange={onChange}
            onSubmit={onSubmit} />
    )
}

const mapStateToProps = (state: any): any => ({
    options: editFormOptionsSelector(state)
});

const mapDispatchToProps = {
    addTimeEntry,
    updateTimeEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
