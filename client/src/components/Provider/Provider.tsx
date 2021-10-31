// Libs
import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';

// Store
import store from '@/stores/store';

// Types
import {ProviderProps} from './Provider.types';

const Provider = ({children}: ProviderProps) => (
    <ReduxProvider store={store}>{children && children}</ReduxProvider>
);

export default Provider;
