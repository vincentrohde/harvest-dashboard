// Libs
import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

// Components
import TimeEntry from './TimeEntry';

// Types
import { TimeEntryProps } from './TimeEntry.types';

const mockData: TimeEntryProps = {
    data: {
        hours: 1,
        id: 1,
        notes: 'test note',
        spent_date: '01/01/2022',
        is_running: false,
        project: {
            id: 1,
            name: 'test project'
        },
        task: {
            id: 1,
            name: 'test task'
        }
    },
    deleteTimeEntry: () => null
}

describe('<TimeEntry />', () => {
    it('renders', () => {
        const { asFragment } = render(
            <TimeEntry {...mockData} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
})
