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
import { EditFormProps, EditFormEntry } from './EditForm.types';
import { TimeEntrySubmissionInterface } from '../../types/TimeEntry';
import { onChangeHandler } from '../../types/components/SemanticInput';

const EditForm = ({
    data,
    options=null,
    onSuccess = () => {},
    onCancel = () => {},
    addTimeEntry,
    updateTimeEntry
}: EditFormProps) => {

    let id: undefined | EditFormEntry['id'];

    if (typeof data === 'undefined') {
        data = {...defaultData};
    }

    if (typeof data.id !== 'undefined') {
        id = data.id;
    }

    const isNewEntry = typeof id === 'undefined';
    const [entry, setEntry] = useState({
        spent_date: timeService.iso8601ToDDMMYYY(data.spent_date),
        hours: data.hours,
        notes: data.notes,
        project_id: data.project_id,
        task_id: data.task_id,
    });
    const [lastInputChange, setLastInputChange] = useState('');

    let tasks;
    if (options && options.tasksSelector) {
        tasks = semanticUiService.convertDataToSelectOptions(
            options.tasksSelector
        );
    }

    let projects;
    if (options && options.projectsSelector) {
        projects = semanticUiService.convertDataToSelectOptions(
            options.projectsSelector
        );
    }

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
            .then(({ data: timeEntry }) => {
                if (typeof addTimeEntry !== 'undefined') {
                    addTimeEntry(timeEntry);
                }
                resetStateToDefault();
                onSuccess();
            })
            .catch((error) => console.log(error));
    }

    const submitUpdatedEntry = (updatedEntry: TimeEntrySubmissionInterface) => {
        if (typeof id !== "number") { return; }

        backendService.updateTimeEntry(updatedEntry, id)
            .then(({ data: timeEntry }) => {
                if (typeof updateTimeEntry !== 'undefined') {
                    updateTimeEntry(timeEntry);
                }
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

    return (<> {projects && tasks && <Form
        entry={entry}
        errorList={errorList}
        projects={projects}
        tasks={tasks}
        isFieldInErrorList={isFieldInErrorList}
        isNewEntry={isNewEntry}
        onCancel={onCancel}
        onChange={onChange}
        onSubmit={onSubmit} />}
    </>)
}

const mapStateToProps = (state: any): any => ({
    options: editFormOptionsSelector(state)
});

const mapDispatchToProps = {
    addTimeEntry,
    updateTimeEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
