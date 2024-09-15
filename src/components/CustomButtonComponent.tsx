import React from "react";
import { ICarDataBaseFields } from "./ICarData";
import { GridApi } from "ag-grid-community/dist/types/core/api/gridApi";

type TProps = {
  data: ICarDataBaseFields;
  api: GridApi
};

export default function CustomButtonComponent(props: TProps) {
  console.log("props", props);
  const handleClick = () => {
    const selectedRows = props.api.getSelectedRows();
    const selectedRow = selectedRows[0] as ICarDataBaseFields;
    const name = selectedRows.length > 0 ? selectedRow.model : '';
    window.alert(`clicked ${props.data.make}, selected ${name}`);
  };

  return <button onClick={handleClick}>Push Me!</button>;
}
