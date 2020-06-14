// Modules
import React, { useState, useEffect } from 'react';
import { Button, Form, Icon, Input, Select } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import _ from 'underscore';

// Components
import FormError from './FormError/FormError';

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

import style from './EditForm.scss';

const defaults = {
    notes: '',
    hours: '0:00',
    project_id: '',
    task_id: ''
}

const EditForm = ({
    entryData,
    isNewEntry=false,
    options=null,
    toggleEditMode=null }) => {

    // Variables

    const hoursInputRegex = /(^([1-9]?)([0-9])(:)([0-5])([0-9])$)/;
    const dateInputRegex = /^[0-9]{2}[.]{1}[0-9]{2}[.]{1}[0-9]{4}$/;
    const { id } = entryData;

    // State

    const [entry, setEntry] = useState({
        spent_date: timeService.iso8601ToDDMMYYY(entryData.date),
        hours: entryData.hours || defaults.hours,
        notes: entryData.notes || defaults.notes,
        project_id: entryData.projectId || defaults.project_id,
        task_id: entryData.taskId || defaults.task_id,
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

    const removeErrorFromList = (name) => {
        const newErrorList = [...errorList];

        newErrorList.forEach((item, index) => {
            if (item === name) {
                newErrorList.splice(index, 1);
            }
        });

        setErrorList(newErrorList);
    }

    const isFieldInErrorList = (name) => {
        return errorList.includes(name);
    }

    // Input Changes

    const userInputErrorHandler = (inputName, regex) => {
        const input = entry[inputName];
        const isInputValid = input.match(regex);

        if (isInputValid) {
            removeErrorFromList(inputName);
            return;
        }

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

    const handleChange = (event, { name: inputName, value: inputValue }) => {
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
            hours: convertedHours,
            spent_date: convertedDate
        };
    };

    const handleSubmitOfNewEntry = (newEntry) => {
        backendService.addTimeEntry(newEntry)
            .then(({ data }) => {
                addTimeEntry(data);
                resetStateToDefault();
            })
            .catch((error) => console.log(error));
    }

    const handleSubmitOfEntryUpdate = (updatedEntry) => {
        backendService.updateTimeEntry(updatedEntry, id)
            .then(({ data: timeEntry }) => {
                // timeEntry = JSON.parse(timeEntry);
                updateTimeEntry(timeEntry);
            })
            .catch((error) => console.log(error));
    };

    const handleSubmit = (event) => {
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
        toggleEditMode()
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
                    <Form.Field
                        control={Select}
                        label={{
                            children: "Task",
                            htmlFor: "form-select-control-task"
                        }}
                        search
                        searchInput={{ id: "form-select-control-task" }}
                        options={tasks}
                        placeholder="Task"
                        name="task_id"
                        onChange={handleChange}
                        value={entry.task_id}
                    />
                    <Form.Field
                        control={Select}
                        label={{
                            children: "Project",
                            htmlFor: "form-select-control-task"
                        }}
                        search
                        searchInput={{ id: "form-select-control-task" }}
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

                <Form.Group className="submit-row" widths="equal">
                    { !isNewEntry && (
                        <Button
                            className="cancel-button js-cancel"
                            width={5}
                            size="medium"
                            type="button"
                            onClick={handleCancel}
                        >
                            <Icon name="undo" /> Cancel
                        </Button>
                    )}
                    <Button
                        className="submit-button js-submit"
                        width={5}
                        size="medium"
                        primary
                        disabled={
                            errorList.length != '0'
                            || !entry.hours
                            || !entry.project_id
                            || !entry.notes
                            || !entry.task_id
                            || !entry.spent_date
                        }
                    >
                        <Icon name="send" /> Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

const mapStateToProps = state => ({
    options: editFormOptionsSelector(state)
});

const mapDispatchToProps = {
    addTimeEntry,
    updateTimeEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);