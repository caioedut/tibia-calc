import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './config/routes';

import './styles/index.css';

function App() {
    return (
        <Routes/>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root'),
);
