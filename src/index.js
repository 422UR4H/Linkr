import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ResetStyle from "./Styles/ResetStyle.js";
import { TokenProvider } from "./Contexts/TokenContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ResetStyle />
    <TokenProvider>
      <App />
    </TokenProvider>
  </React.StrictMode>
);
