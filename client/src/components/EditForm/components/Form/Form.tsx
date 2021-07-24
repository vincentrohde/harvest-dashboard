// Libs
import React from 'react';
import { Form as SemanticUiForm } from 'semantic-ui-react';

// Components
import Error from '../Error/Error';
import Task from '../Task/Task';
import Project from '../Project/Project';
import Date from '../Date/Date';
import Notes from '../Notes/Notes';
import Hours from '../Hours/Hours';
import Submit from '../Submit/Submit';
import Cancel from '../Cancel/Cancel';

// Types
import { FormProps } from './Form.props';

// Styles
import './Form.scss';

const Form = ({ entry, errorList, isFieldInErrorList, isNewEntry, tasks, projects, onCancel, onChange, onSubmit}: FormProps) => {
    return (<div className={`Form full ${isNewEntry ? 'tab-container' : ''}`}>
        <SemanticUiForm
            onSubmit={onSubmit}
            error={errorList.length !== 0}
            autoComplete="off"
        >
            <Error error={errorList}/>

            <SemanticUiForm.Group widths="equal">
                <Task taskId={entry.task_id}
                      tasks={tasks}
                      handleChange={onChange} />
                <Project projectId={entry.project_id}
                         projects={projects}
                         handleChange={onChange} />
                <Date date={entry.spent_date}
                      isError={isFieldInErrorList('spent_date')}
                      handleChange={onChange}/>
            </SemanticUiForm.Group>

            <SemanticUiForm.Group>
                <Notes notes={entry.notes} handleChange={onChange}/>
                <Hours hours={entry.hours}
                       isError={isFieldInErrorList('hours')}
                       handleChange={onChange}/>
            </SemanticUiForm.Group>

            <SemanticUiForm.Group className="submit-row" widths="equal">
                <Submit disabled={
                    errorList.length !== 0
                    || !entry.hours
                    || !entry.project_id
                    || !entry.notes
                    || !entry.task_id
                    || !entry.spent_date
                } />
                { !isNewEntry && <Cancel onCancel={onCancel} /> }
            </SemanticUiForm.Group>
        </SemanticUiForm>
    </div>)
};

export default Form;
