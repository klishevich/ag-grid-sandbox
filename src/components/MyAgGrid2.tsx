import React from "react";
import { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community/dist/types/core/entities/colDef";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface ICompanyData {
  mission: string;
  company: string;
  location: string;
  date: string;
  price: number;
  successful: boolean;
  rocket: string;
}

function CompanyLogoRenderer({ value }: { value: string }) {
  return (
    <span
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
      }}
    >
      {value && (
        <img
          alt={`${value} Flag`}
          src={`https://www.ag-grid.com/example-assets/space-company-logos/${value.toLowerCase()}.png`}
          style={{
            display: "block",
            width: "25px",
            height: "auto",
            maxHeight: "50%",
            marginRight: "12px",
            filter: "brightness(1.1)",
          }}
        />
      )}
      <p
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </p>
    </span>
  );
}

export default function MyAgGrid2() {
  console.log("Ag Grid 2");
  const [rowData, setRowData] = useState<ICompanyData[]>([]);

  const [columnDefs, setColumnDefs] = useState<ColDef<ICompanyData, any>[]>([
    { field: "mission", filter: false },
    { field: "company", cellRenderer: CompanyLogoRenderer },
    { field: "location" },
    { field: "date" },
    {
      field: "price",
      valueFormatter: (params) => {
        return "£" + params.value.toLocaleString();
      },
    },
    { field: "successful" },
    { field: "rocket" },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo(
    () => ({
      filter: true, // Enable filtering on all columns
      editable: true
    }),
    []
  );

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/space-mission-data.json") // Fetch data from server
      .then((result) => result.json()) // Convert to JSON
      .then((rowData) => {
        console.log("data has been loaded");
        setRowData(rowData);
      }); // Update state of `rowData`
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact<ICompanyData>
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={100}
        paginationPageSizeSelector={[50, 100, 200]}
        defaultColDef={defaultColDef}
        onCellValueChanged={event => console.log(`New Cell Value: ${event.value}`)}
      />
    </div>
  );
}
