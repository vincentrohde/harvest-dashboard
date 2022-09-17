// Libs
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Components
import MetaData from './MetaData';

// Types
import { MetaDataProps } from './MetaData.types';

const mockData: MetaDataProps = {
    date: '01.01.2022',
    notes: 'Test notes',
    task: 'Test task'
}

describe('<MetaData />', () => {
    it('renders', () => {
        const { asFragment } = render(
            <MetaData {...mockData} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
})
