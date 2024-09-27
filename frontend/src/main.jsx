import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import {ApolloProvider} from '@apollo/client';
import client from './apollo-client.js';
import './index.css';
import './i18.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>
);