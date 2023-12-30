import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BreadCrumb } from "primereact/breadcrumb";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";

import openSourceService from "../../service/openSourceService";

import "./index.css";

export const OpenSourceAdmin = () => {
  const navigate = useNavigate();

  const items = [{ label: "Fuentes Abiertas" }, { label: "Administrar" }];
  const home = { icon: "pi pi-home", url: "/" };

  const [openSourceList, setOpenSourceList] = useState([]);
  const dt = useRef(null);

  const deleteAction = async (rowData) => {
    const response = await openSourceService.delete(rowData.id);
    console.log("response", response);
    console.log("deleteAction", rowData);
  };

  const editAction = (rowData) => {
    console.log("editAction", rowData);
  };

  const viewAction = (rowData) => {
    navigate("/open-source/" + rowData.id);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded"
          text
          onClick={() => editAction(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded"
          severity="danger"
          text
          onClick={() => deleteAction(rowData)}
        />
        <Button
          icon="pi pi-eye"
          className="p-button-rounded"
          text
          onClick={() => viewAction(rowData)}
        />
      </>
    );
  };

  useEffect(() => {
    (async () => {
      setOpenSourceList(await openSourceService.findAll());
    })();
  }, []);

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
      <Button
        type="button"
        icon="pi pi-file"
        rounded
        onClick={() => exportCSV(false)}
        data-pr-tooltip="CSV"
      />
    </div>
  );

  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />
      <Tooltip target=".export-buttons>button" position="bottom" />
      <DataTable
        value={openSourceList.data ? openSourceList.data.dataList : []}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        dataKey="id"
        ref={dt}
        header={header}
        paginator
        emptyMessage="No data found."
        className="datatable-responsive"
        currentPageReportTemplate="Mostrando desde {first} hasta {last} de {totalRecords} fuentes abiertas"
        rows={10}
      >
        <Column field="id" header="ID" sortable></Column>

        <Column
          field="inputSearch"
          header="Busquedas"
          sortable
          filter
          filterPlaceholder="Por busqueda"
        ></Column>
        <Column
          field="isSuscribed"
          header="Esta suscrito"
          sortable
          body={(rowData) => (rowData.isSuscribed ? "Si" : "No")}
          filter
          filterPlaceholder="Suscrito"
        ></Column>
        <Column
          field="price"
          header="Precio $"
          sortable
          filter
          filterPlaceholder="Precio"
        ></Column>
        <Column
          field="url"
          header="Url"
          sortable
          filter
          filterPlaceholder="Url"
        ></Column>
        <Column header="Acciones" body={actionBodyTemplate}></Column>
      </DataTable>
    </>
  );
};
