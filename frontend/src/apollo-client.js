import {ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat} from '@apollo/client';

const httpLink = new HttpLink({
    url: 'http://localhost:8080/graphql'
})
const authMiddleware = new ApolloLink((operation, forward)=> {
    const token = localStorage.getItem("token");
    if (token) {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    return forward(operation);
})


const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    mode: 'cors',
    request: operation => {
        const token = localStorage.getItem("token");
        if (token) {
            operation.setContext({
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        }
    },
    cache: new InMemoryCache(),
});

export default client;
