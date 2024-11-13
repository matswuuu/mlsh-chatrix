import {ApolloClient, InMemoryCache, split, HttpLink} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import {WebSocketLink} from "@apollo/client/link/ws";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions/";
import {createClient} from "graphql-ws";

const httpLink = new HttpLink({
    uri: 'http://localhost:8080/graphql'
})
const webSocketLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:8080/graphql',
}));

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation ===  'subscription'
        );
    },
    webSocketLink,
    httpLink
);

const client = new ApolloClient({
    link: splitLink,
    mode: 'cors',
    cache: new InMemoryCache(),
    request: operation => {
        const token = localStorage.getItem("token");
        if (token) {
            operation.setContext({
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        }
    }
});

export default client;
