// Libs
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './components/App/App';
import Provider from './components/Provider/Provider';

// Styles
import 'semantic-ui-css/semantic.min.css';
import './index.scss';

ReactDOM.render((<Provider>
    <App />
</Provider>), document.querySelector('.app-container'));
