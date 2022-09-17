// Libs
import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

// Components
import DateRange from './DateRange';

// Types
import { DateRangeProps } from './DateRange.types';

const mockData: DateRangeProps = {
    value: 'Test',
    // @ts-ignore
    onChange: (_event: 'any', data) => null
}

describe('<DateRange />', () => {
    it('renders', () => {
        const { asFragment } = render(
            <DateRange {...mockData} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
})
