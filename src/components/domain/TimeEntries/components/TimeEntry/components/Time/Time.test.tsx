// Libs
import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

// Components
import Time from './Time';

// Types
import { TimeProps } from './Time.types';

describe('<Time />', () => {
    it('renders inactive', () => {
        const mockData: TimeProps = {
            hoursAndMinutes: '1:00',
            isActive: false,
            toggleActive: () => null
        }

        const { asFragment } = render(
            <Time {...mockData} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('renders active', () => {
        const mockData: TimeProps = {
            hoursAndMinutes: '1:00',
            isActive: true,
            toggleActive: () => null
        }

        const { asFragment } = render(
            <Time {...mockData} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
})
