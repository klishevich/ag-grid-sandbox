import React from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community/dist/types/core/entities/colDef";
// import { ColDef } from "@ag-grid-community/core"; This caused a problem!!! 
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ICarData } from "./ICarData";

export default function MyAgGrid() {
  const [rowData, setRowData] = useState<ICarData[]>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "model" },
    { field: "make" },
    { field: "price" },
    { field: "electric" },
  ]);

  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact<ICarData>
        rowData={rowData}
        columnDefs={columnDefs}
      />
    </div>
  );
}
