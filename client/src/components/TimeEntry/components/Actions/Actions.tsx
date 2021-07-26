// Libs
import React from 'react';
import { Icon } from 'semantic-ui-react';

// Types
import { ActionsProps } from './Actions.types';

// Styles
import './Actions.scss';

const Actions = ({ handleDelete, toggleEdit }: ActionsProps) => (<div className="actions-header">
    <Icon className="delete js-delete" name="trash alternate" onClick={handleDelete}/>
    <Icon className="edit js-edit" name="pencil" onClick={toggleEdit}/>
</div>);

export default Actions;
