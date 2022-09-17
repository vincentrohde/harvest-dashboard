// Libs
import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

// Components
import Actions from './Actions';

// Types
import { ActionsProps } from './Actions.types';

const mockData: ActionsProps = {
    handleDelete: () => null,
    toggleEdit: () => null
}

describe('<Actions />', () => {
    it('renders', () => {
        const { asFragment } = render(
            <Actions {...mockData} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
})
