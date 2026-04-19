import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/opendyslexic/400.css";
import "@fontsource/opendyslexic/700.css";
import "./styles/global.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
);
