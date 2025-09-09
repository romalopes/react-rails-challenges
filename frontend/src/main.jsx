import "./index.css";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router";
// import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import Authentication, { PageType } from "./pages/Authentication.jsx";
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. {this.state.hasError}</h1>;
    }

    return this.props.children;
  }
}
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Authentication pageType={PageType.login} />,
  },
  {
    path: "/register",
    element: <Authentication pageType={PageType.register} />,
  },
]);
const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    {/* <ErrorBoundary> */}
    {/* <App /> */}
    {/* <CookiesProvider defaultSetOptions={{ path: "/" }}> */}
    {/* <App /> */}
    <RouterProvider router={router} />
    {/* </CookiesProvider> */}
    {/* </ErrorBoundary> */}
  </StrictMode>
);
