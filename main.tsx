import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/globals.css';
import './styles/responsive.css';

// Simple routing based on URL path
const getInitialPage = () => {
    const path = window.location.pathname;
    if (path === '/admin') return 'admin';
    return 'home';
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App initialPage={getInitialPage()} />
    </React.StrictMode>,
);