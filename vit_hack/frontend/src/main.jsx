import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";  // ✅

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>   {/* 🔥 THIS WAS MISSING */}
      <App />
    </AppProvider>
  </BrowserRouter>
);