// Typescript
import { TimeEntrySubmissionInterface, ShallowSubmissionEntryInterface } from '../../../interfaces/TimeEntry';
import { onChangeHandler } from '../../../interfaces/components/SemanticInput';

// Modules
import React, { useState, useEffect } from 'react';
import { Form, Input } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import _ from 'underscore';

// Components
import FormError from './FormError/FormError';
import SubmitRow from './SubmitRow/SubmitRow';
import DropDownInput from './DropDownInput/DropDownInput';

// Redux
import { connect } from 'react-redux';
import { editFormOptionsSelector } from '../../stores/selectors';
import { addTimeEntry, updateTimeEntry } from '../../stores/actions/timeEntries';

// Custom Services
import { semanticUiService } from '../../lib/SemanticUiService/SemanticUiService';
import { objectService } from '../../lib/ObjectService/ObjectService';
import { backendService } from '../../lib/BackendService/BackendService';
import { timeService } from '../../lib/TimeService/TimeService';

// Hooks

import { usePrevious } from '../../hooks/usePrevious';

// Styles
import './EditForm.scss';

interface EntryDataAsProps extends ShallowSubmissionEntryInterface {
    id?: number;
    hours: string;
    project_id: TimeEntrySubmissionInterface['project_id'] | string;
    task_id: TimeEntrySubmissionInterface['task_id'] | string;
}

interface EditFormProps {
    entryData?: EntryDataAsProps;
    isNewEntry?: boolean;
    options?: any;
    setIsEdit?: (isEdit: boolean) => void;
}

const defaults = {
    notes: '',
    hours: '0:00',
    project_id: '',
    task_id: '',
    spent_date: timeService.getCurrentDate()
}

const EditForm = ({
    entryData,
    isNewEntry=false,
    options=null,
    setIsEdit }: EditFormProps) => {

    // Variables

    const hoursInputRegex = /(^([1-9]?)([0-9])(:)([0-5])([0-9])$)/;
    const dateInputRegex = /^[0-9]{2}[.]{1}[0-9]{2}[.]{1}[0-9]{4}$/;

    let id: boolean | EntryDataAsProps['id'] = false;

    if (typeof entryData === 'undefined') {
        entryData = {...defaults};
    }

    if (typeof entryData.id !== 'undefined') {
        id = entryData.id;
    }

    const date = entryData.spent_date;

    // State

    const [entry, setEntry] = useState({
        spent_date: timeService.iso8601ToDDMMYYY(date),
        hours: entryData.hours,
        notes: entryData.notes,
        project_id: entryData.project_id,
        task_id: entryData.task_id,
    });

    const prevEntry = usePrevious({ entry });

    const [lastInputChange, setLastInputChange] = useState('');

    const [errorList, setErrorList] = useState([]);

    const [tasks] = useState(
        semanticUiService.convertDataToSelectOptions(options.tasksSelector)
    );

    const [projects] = useState(
        semanticUiService.convertDataToSelectOptions(options.projectsSelector)
    );

    const resetStateToDefault = () => {
        setEntry({
            ...entry,
            ...defaults
        })
    }

    // Errors

    const removeErrorFromList = (name: string) => {
        const newErrorList = [...errorList];

        newErrorList.forEach((item, index) => {
            if (item === name) {
                newErrorList.splice(index, 1);
            }
        });

        setErrorList(newErrorList);
    }

    const isFieldInErrorList = (name: string) => {
        // @ts-ignore
        return errorList.includes(name);
    }

    // Input Changes

    const userInputErrorHandler = (inputName: keyof typeof entry, regex: RegExp) => {
        const input = entry[inputName];
        const isInputValid = input.toString().match(regex.toString());

        if (isInputValid) {
            removeErrorFromList(inputName);
            return;
        }

        // @ts-ignore
        setErrorList([
            ...errorList,
            inputName
        ]);
    }

    const checkNewUserInput = () => {
        if (lastInputChange === 'hours') {
            userInputErrorHandler('hours', hoursInputRegex);
        }

        if (lastInputChange === 'spent_date') {
            userInputErrorHandler('spent_date', dateInputRegex);
        }
    }

    const debouncedNewUserInputChecker = _.debounce(checkNewUserInput, 2000);

    const handleChange: onChangeHandler = (_event: any, { name: inputName, value: inputValue }: { name: string, value: string }) => {
        setLastInputChange(inputName);

        setEntry({
            ...entry,
            [inputName]: inputValue
        });
    }

    // Submit

    const getApiFormatConvertedEntry = () => {
        const { hours: inputHours, spent_date: inputDate } = entry;

        const convertedHours = timeService.hoursAndMinutesToHours(inputHours);
        const convertedDate = timeService.ddMMYYYYToISO8601(inputDate);

        return {
            ...entry,
            project_id: Number(entry.project_id),
            task_id: Number(entry.task_id),
            hours: convertedHours,
            spent_date: convertedDate
        };
    };

    const handleSubmitOfNewEntry = (newEntry: TimeEntrySubmissionInterface) => {
        backendService.addTimeEntry(newEntry)
            .then(({ data }) => {
                addTimeEntry(data);
                resetStateToDefault();
            })
            .catch((error) => console.log(error));
    }

    const handleSubmitOfEntryUpdate = (updatedEntry: TimeEntrySubmissionInterface) => {
        if (typeof id !== "number") { return; }

        backendService.updateTimeEntry(updatedEntry, id)
            .then(({ data: timeEntry }) => {
                // timeEntry = JSON.parse(timeEntry);
                updateTimeEntry(timeEntry);
            })
            .catch((error) => console.log(error));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const convertedEntry = getApiFormatConvertedEntry();

        if (isNewEntry) {
            handleSubmitOfNewEntry(convertedEntry);
            return;
        }

        handleSubmitOfEntryUpdate(convertedEntry);
    };

    // Cancel

    const handleCancel = () => {
        if (typeof setIsEdit === "undefined") return;
        setIsEdit(false);
    };

    // State Listeners

    useEffect(() => {
        const isSameEntry = !objectService.isNewObjectDifferent(prevEntry, entry);
        if (isSameEntry) return;

        debouncedNewUserInputChecker();
    }, [entry]);

    return (
        <div className={`EditForm full ${isNewEntry ? 'tab-container' : ''}`}>
            <Form
                onSubmit={handleSubmit}
                error={errorList.length !== 0}
                autoComplete="off"
            >
                <FormError error={errorList}/>
                <Form.Group widths="equal">
                    <DropDownInput
                        label={{
                            children: "Task",
                            htmlFor: "form-select-control-task"
                        }}
                        searchInputId={"form-select-control-task"}
                        options={tasks}
                        placeholder="Task"
                        name="task_id"
                        onChange={handleChange}
                        value={entry.task_id}
                    />
                    <DropDownInput
                        label={{
                            children: "Project",
                            htmlFor: "form-select-control-task"
                        }}
                        searchInputId={"form-select-control-task"}
                        options={projects}
                        placeholder="Project"
                        name="project_id"
                        onChange={handleChange}
                        value={entry.project_id}
                    />
                    <DateInput
                        className="submit-btn"
                        name="spent_date"
                        placeholder="Date"
                        label="Date"
                        inlineLabel={false}
                        dateFormat={"DD.MM.YYYY"}
                        value={entry.spent_date}
                        error={isFieldInErrorList('spent_date')}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Field
                        className="form-input"
                        control={Input}
                        label="Notes"
                        placeholder="Notes"
                        name="notes"
                        onChange={handleChange}
                        value={entry.notes}
                        width={12}
                    />
                    <Form.Field
                        className="form-input"
                        control={Input}
                        label="Hours"
                        placeholder="Hours"
                        name="hours"
                        error={isFieldInErrorList('hours')}
                        onChange={handleChange}
                        value={entry.hours}
                        width={4}
                    />
                </Form.Group>

                <SubmitRow
                    entry={entry}
                    errorList={errorList}
                    handleCancel={handleCancel}
                    isNewEntry={isNewEntry} />
            </Form>
        </div>
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