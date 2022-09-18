// Libs
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

// Components
import Error from './Error';

// Types
import { ErrorProps } from './Error.types';

describe('<TabContainer />', () => {
    it('renders hours error correctly', () => {
        const mockData: ErrorProps = {
            error: ['hours']
        }

        const { asFragment } = render(
            <Error {...mockData} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('renders spent_date error correctly', () => {
        const mockData: ErrorProps = {
            error: ['spent_date']
        }

        const { asFragment } = render(
            <Error {...mockData} />
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('renders default error correctly', () => {
        const mockData: ErrorProps = {
            error: []
        }

        const { asFragment } = render(
            <Error {...mockData} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
})
