import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MyAgGrid from "./components/MyAgGrid";
import MyAgGrid2 from "./components/MyAgGrid2";

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(
  <React.Fragment>
    <h1>AG Grid!</h1>
    <MyAgGrid2 />
  </React.Fragment>
);
