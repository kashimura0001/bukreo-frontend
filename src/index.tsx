import React from "react";
import ReactDOM from "react-dom";
import "./lib/firebase";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./providers/AuthProvider";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./config/apolloClient";
import { RecoilRoot } from "recoil";
import { extendTheme } from "@chakra-ui/react";
import { colors } from "./constants/color";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: colors.semantics.bodyBackground,
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <ApolloProvider client={apolloClient}>
            <App />
          </ApolloProvider>
        </AuthProvider>
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
