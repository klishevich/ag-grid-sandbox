import React from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community/dist/types/core/entities/colDef";
// import { ColDef } from "@ag-grid-community/core"; This caused a problem!!!
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import "./theme-styles.css";
import { ICarData } from "./ICarData";
import CustomButtonComponent from "./CustomButtonComponent";

export default function MyAgGrid() {
  const [rowData, setRowData] = useState<ICarData[]>([
    { make: "Hyundai", model: "Kona", price: 25_745, electric: false },
    { make: "Hyundai", model: "Santa Fe", price: 35_615, electric: false },
    { make: "Hyundai", model: "IONIQ 6", price: 38_900, electric: true },
    { make: "Tesla", model: "Model Y", price: 31_490, electric: true },
    { make: "Tesla", model: "Model 3", price: 33_990, electric: true },
    { make: "Tesla", model: "Model S", price: 68_490, electric: true },
    { make: "Ford", model: "Mustang", price: 33_515, electric: false },
    { make: "Ford", model: "Escape", price: 29_490, electric: false },
    { make: "Ford", model: "Mustang MACH-E", price: 41_990, electric: true },
    {
      make: "Toyota",
      model: "Corolla Hatchback",
      price: 24_600,
      electric: false,
    },
    { make: "Toyota", model: "GR Supra", price: 57_345, electric: false },
    { make: "Toyota", model: "Bz4x", price: 44_420, electric: true },
  ]);

  const [columnDefs, setColumnDefs] = useState<ColDef<ICarData, any>[]>([
    {
      field: "make",
      filter: true,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["Tesla", "Ford", "Toyota"],
      },
      checkboxSelection: true,
    },
    {
      field: "electric",
      filter: true,
      cellClassRules: {
        "rag-green": (params) => params.data?.electric === true,
      },
    },
    {
      headerName: "Maker and Model",
      valueGetter: (v: { data: ICarData | undefined }) => {
        console.log("maker and model log", v);
        return v.data ? `${v.data.make} ${v.data.model}` : "";
      },
    },
    {
      field: "price",
      valueFormatter: (v: { data: ICarData | undefined }) =>
        v.data ? `$ ${v.data.price.toLocaleString()}` : "",
    },
    {
      field: "button",
      cellRenderer: CustomButtonComponent,
    },
  ]);

  console.log("render");

  return (
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact<ICarData>
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[5, 10, 20]}
      />
    </div>
  );
}
