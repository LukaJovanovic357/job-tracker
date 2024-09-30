import React from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "./assets/css/index.css";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
} else {
  console.error("Root container missing in index.html");
}
