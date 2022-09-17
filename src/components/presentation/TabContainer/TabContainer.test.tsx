import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

// Components
import TabContainer from './TabContainer';

// Types
import { TabContainerProps } from './TabContainer.types';

const mockData: TabContainerProps = {
    title: 'My Test Container',
    caption: 'This is a rendered test container.'
}

describe('<TabContainer />', () => {
    it('renders', () => {
        const { asFragment } = render(
            <TabContainer {...mockData}>
                <p>Test</p>
            </TabContainer>
        );

        expect(asFragment()).toMatchSnapshot();
    });
})
