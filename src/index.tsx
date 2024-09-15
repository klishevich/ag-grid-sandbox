import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MyAgGrid from "./components/MyAgGrid";

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(
  <React.Fragment>
    <h1>Hello React!</h1>
    <MyAgGrid />
  </React.Fragment>
);
