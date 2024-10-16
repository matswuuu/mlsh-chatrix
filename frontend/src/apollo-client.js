import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:8080/graphql',
    }),
    credentials: 'include',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken' : document.cookie.at('csrftoken')
    },
    cache: new InMemoryCache(),
});

export default client;
