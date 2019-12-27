import Entry from './Entry';
import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';

const wrapper = shallow(<Entry
    isEdit={false}
    isNew={false}
    information={{
        id: 'test',
        spent_date: moment().format('YYYY-MM-DD'),
        task: {
            id: 'test-task'
        },
        project: {
            id: 'test-project'
        },
        notes: 'test-notes'
    }}
/>);

const instance = wrapper.instance();

test('getObjectForDefaults without params returns default object', () => {
    expect(instance.getObjectForDefaults()).toEqual({
        task_id: '',
        project_id: '',
        notes: '',
        hours: '0:00',
        spent_date: ''
    });
});

test('getObjectForDefaults returns object with converted params', () => {
    const params = {
        task: {
            id: 'test-task'
        },
        project: {
            id: 'test-project'
        },
        notes: 'test-notes',
        hours: '0.5',
        spent_date: '2019-07-23'
    };

    expect(instance.getObjectForDefaults(params)).toEqual({
        task_id: params.task.id,
        project_id: params.project.id,
        notes: params.notes,
        hours: '0:30',
        spent_date: '23.07.2019'
    });
});