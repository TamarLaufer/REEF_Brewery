import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BreweriesProvider } from "./Context/BreweriesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BreweriesProvider>
    <App />
  </BreweriesProvider>
);
