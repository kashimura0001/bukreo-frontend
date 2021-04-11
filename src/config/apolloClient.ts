import { ApolloClient, concat, HttpLink, InMemoryCache } from "@apollo/client";
import firebase from "firebase";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL });

const authLink = setContext(async (_, { headers }) => {
  const token = await firebase.auth().currentUser?.getIdToken(true);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authLink, httpLink),
});
