import { ApolloClient, InMemoryCache, HttpLink, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getUserId } from "./utils/user";

// const authLink = setContext((_, { headers }) => {
//   const userId = getUserId(); 
//   return {
//     headers: {
//       ...headers,
//       'x-user-id': userId, // Send userId in a custom header
//     },
//   };
// });

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: "http://localhost:4000/graphql",
//     credentials: "include", 
//   }),
//   cache: new InMemoryCache(),
// });


// const httpLink = new HttpLink({
//   uri: 'http://localhost:4000/graphql', // Your GraphQL endpoint
// });

// const authLink = setContext((_, { headers }) => {
//   const userId = getUserId(); // Get userId from cookie
//   return {
//     headers: {
//       ...headers,
//       'x-user-id': userId, // Send userId in a custom header
//     },
//   };
// });

// const client = new ApolloClient({
//    link: new HttpLink({
//     uri: "http://localhost:4000/graphql",
//     credentials: "include", 
//   }),
//   cache: new InMemoryCache(),
// });

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// const batchLink = new BatchHttpLink({
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_URL, 
//   batchInterval: 10, 
//   batchMax: 10, 
//   credentials: "include", 
// });
const userId = getUserId();
const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: userId,
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
 // link: authLink.concat(httpLink),
  cache: new InMemoryCache({ resultCaching: false }),
  ssrMode: false,
  defaultOptions: {
    watchQuery: { fetchPolicy: "no-cache" },
    query: { fetchPolicy: "no-cache" },
  },
});
export default client;
