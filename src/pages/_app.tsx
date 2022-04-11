import type { AppProps } from 'next/app'
import Provider from '@/components/Provider/Provider';
import React from 'react';

// Styles
import 'semantic-ui-css/semantic.min.css';
import './index.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return <Provider>
        <Component {...pageProps} />
    </Provider>
}

export default MyApp
