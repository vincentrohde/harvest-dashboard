// Libs
import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

// Components
import MetaDataHeader from './MetaDataHeader';

// Types
import { MetaDataHeaderProps } from './MetaDataHeader.types';

const mockData: MetaDataHeaderProps = {
    entriesAmount: 20,
    totalHoursAndMinutes: '2:00'
}

describe('<MetaDataHeader />', () => {
    it('renders', () => {
        const { container } = render(
            <MetaDataHeader {...mockData} />
        );

        expect(container).toMatchSnapshot();
    });
})
