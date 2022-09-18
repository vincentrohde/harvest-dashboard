import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import OAuthOverlay from './OAuthOverlay';

describe('<OAuthOverlay />', () => {
    it('renders OAuthOverlay correctly', () => {
        const { asFragment } = render(<OAuthOverlay />);

        expect(asFragment()).toMatchSnapshot();
    });
})
