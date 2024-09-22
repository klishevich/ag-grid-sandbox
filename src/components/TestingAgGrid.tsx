import React from "react";
import { useState, useEffect, useMemo } from "react";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { ColDef } from "ag-grid-community/dist/types/core/entities/colDef";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface IData {
  make: string;
  model: string;
  price: number;
  bought: boolean;
}

const BuyCellRenderer = (props: CustomCellRendererProps) => {
  console.log(111, props.node);
  const buttonClick = () => props.node.setDataValue("bought", true);

  return (
    <>
      {props.data?.bought ? (
        <span>Bought a {props.data?.make}</span>
      ) : (
        <button onClick={buttonClick}>Buy: {props.data?.make}</button>
      )}
    </>
  );
};

export default function TestingAgGrid() {
  console.log("TestingAgGrid");
  const [rowData, setRowData] = useState<IData[]>([
    { make: "Toyota", model: "Celica", price: 35000, bought: false },
    { make: "Ford", model: "Mondeo", price: 32000, bought: false },
    { make: "Porsche", model: "Boxster", price: 72000, bought: false },
  ]);

  const [columnDefs, setColumnDefs] = useState<ColDef<IData, any>[]>([
    { field: "make" },
    { field: "model" },
    {
      field: "price",
      valueFormatter: (params) => "$" + params.value.toLocaleString(),
    },
    { field: "bought", cellRenderer: BuyCellRenderer },
  ]);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact<IData>
        rowData={rowData}
        columnDefs={columnDefs}
        onCellValueChanged={(event) =>
          console.log(`New Cell Value: ${event.value}`)
        }
      />
    </div>
  );
}
