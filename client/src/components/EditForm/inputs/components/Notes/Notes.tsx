// Libs
import React from 'react';
import { Form, Input } from 'semantic-ui-react';

// Types
import { NotesProps } from './NotesProps';

const Notes = ({notes, handleChange}: NotesProps) => (<Form.Field
    className="form-input"
    control={Input}
    label="Notes"
    placeholder="Notes"
    name="notes"
    onChange={handleChange}
    value={notes}
    width={12}
/>);

export default Notes;
