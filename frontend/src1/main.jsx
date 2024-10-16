import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.jsx';
import {ApolloProvider} from '@apollo/client';
import client from '../src/apollo-client.js';
import './index.css';
import '../src/i18n.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>
);