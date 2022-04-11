// Libs
import React from 'react';
import { Icon } from 'semantic-ui-react';
import classNames from 'classnames';

// Types
import { ActionsProps } from './Actions.types';

// Styles
import styles from './Actions.module.scss';

const Actions = ({ handleDelete, toggleEdit }: ActionsProps) => (<div className={styles['actions-header']}>
    <Icon className={classNames(styles.delete, 'js-delete')} name="trash alternate" onClick={handleDelete}/>
    <Icon className={classNames(styles.edit, 'js-edit')} name="pencil" onClick={toggleEdit}/>
</div>);

export default Actions;
