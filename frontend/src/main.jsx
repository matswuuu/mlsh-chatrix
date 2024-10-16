import React from 'react';
import ReactDOM from 'react-dom/client';
import {ApolloProvider} from '@apollo/client';
import client from '../src/apollo-client.js';
import '../src/i18n.js';
import App from "./components/App/index.jsx";
import "./components/search/1.css"
import "./components/search/2.css"
import "./components/search/3.css"
import "./components/search/4.css"
import "./components/search/5.css"
import "./components/search/6.css"

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>
);