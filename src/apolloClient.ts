import { ApolloClient, InMemoryCache, HttpLink, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getUserId } from "./utils/user";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL as string, // Your GraphQL endpoint
  credentials: "include", // Include cookies in requests
});

const userId = getUserId();
const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: userId,
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ resultCaching: false }),
  ssrMode: false,
  defaultOptions: {
    watchQuery: { fetchPolicy: "no-cache" },
    query: { fetchPolicy: "no-cache" },
  },
});
export default client;
