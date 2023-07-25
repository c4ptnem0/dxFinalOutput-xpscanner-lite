import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Router from "./router/router";
import { ApolloProvider } from "@apollo/client";
import client from "./helpers/apollo";

import "./index.css";
import "antd/dist/reset.css";

const router = createBrowserRouter(Router);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
  // </React.StrictMode>
);
