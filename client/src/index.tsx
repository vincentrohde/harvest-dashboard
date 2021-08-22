// Libs
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './components/App/App';
import ReduxProvider from './components/ReduxProvider/ReduxProvider';

// Styles
import 'semantic-ui-css/semantic.min.css';
import './index.scss';

ReactDOM.render((<ReduxProvider>
    <App />
</ReduxProvider>), document.querySelector('.app-container'));
