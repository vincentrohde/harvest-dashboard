// Libs
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';

// Store
import store from '../../stores/store';

const ReduxProvider = ({ children }: {children: ReactNode}) => (<Provider store={store}>
    { children && children }
</Provider>);

export default ReduxProvider;
