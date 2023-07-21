import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Create a new Apollo Client instance
const client = new ApolloClient({
  uri: "http://localhost:5002/graphql", // Set the URI for the GraphQL endpoint
  cache: new InMemoryCache(), // Create a new instance of the in-memory cache
});

// Create a root element for rendering the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application within the root element
root.render(
  <React.StrictMode>
    {/* Wrap the App component with ApolloProvider to provide the Apollo Client instance */}
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
