import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BreadCrumb } from "primereact/breadcrumb";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";

import { TitlePage } from "../../components/TitlePage";

import openSourceService from "../../service/openSourceService";

import "./index.css";

export const OpenSourceAdmin = () => {
  const navigate = useNavigate();

  const items = [{ label: "Fuentes Abiertas" }, { label: "Administrar" }];
  const home = { icon: "pi pi-home", url: "/" };

  const title = "Administracion - Fuentes Abiertas";

  const [openSourceListActive, setOpenSourceListActive] = useState([]);
  const [openSourceListInactive, setOpenSourceListInactive] = useState([]);

  const dt = useRef(null);

  const deleteAction = async (rowData) => {
    const response = await openSourceService.updateStatus(rowData.id, "I");
    console.log("response", response);
    (async () => {
      setOpenSourceListActive(await openSourceService.findAllByStatus("A"));
    })();
    (async () => {
      setOpenSourceListInactive(await openSourceService.findAllByStatus("I"));
    })();
  };

  const undoAction = async (rowData) => {
    await openSourceService.updateStatus(rowData.id, "A");
    (async () => {
      setOpenSourceListActive(await openSourceService.findAllByStatus("A"));
    })();
    (async () => {
      setOpenSourceListInactive(await openSourceService.findAllByStatus("I"));
    })();
  };

  const editAction = (rowData) => {
    navigate("/open-source-edit/" + rowData.id);
  };

  const viewAction = (rowData) => {
    console.log(rowData);
    navigate("/open-source/" + rowData.id);
  };

  const activeActionBodyTemplate = (rowData) => {
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

  const inactiveActionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-undo"
          className="p-button-rounded"
          severity="success"
          text
          onClick={() => undoAction(rowData)}
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
      setOpenSourceListActive(await openSourceService.findAllByStatus("A"));
    })();
  }, []);
  useEffect(() => {
    (async () => {
      setOpenSourceListInactive(await openSourceService.findAllByStatus("I"));
    })();
  }, []);
  //console.log("openSourceList", openSourceList);

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
      <TitlePage title={title} />
      <TabView>
        <TabPanel
          header={`Activos (${
            openSourceListActive && openSourceListActive.data
              ? openSourceListActive.data.length
              : 0
          })`}
        >
          <div className="m-0">
            {/* <Tooltip target=".export-buttons>button" position="bottom" /> */}
            <DataTable
              value={openSourceListActive ? openSourceListActive.data : []}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              dataKey="id"
              ref={dt}
              //header={header}
              paginator
              emptyMessage="No data found."
              className="datatable-responsive"
              currentPageReportTemplate="Mostrando desde {first} hasta {last} de {totalRecords} fuentes abiertas"
              rows={10}
            >
              {/* <Column field="id" header="ID" sortable></Column>
              <Column
                field="inputSearch"
                header="Busquedas"
                sortable
                filter
                filterPlaceholder="Por busqueda"
              ></Column> */}
              {/* <Column
                field="isSuscribed"
                header="Esta suscrito"
                sortable
                body={(rowData) => (rowData.isSuscribed ? "Si" : "No")}
                filter
                filterPlaceholder="Suscrito"
              ></Column> */}
              {/* <Column
                field="price"
                header="Precio $"
                sortable
                filter
                filterPlaceholder="Precio"
              ></Column> */}
              <Column
                field="url"
                header="Url"
                sortable
                filter
                filterPlaceholder="Url"
              ></Column>
              <Column
                header="Acciones"
                body={activeActionBodyTemplate}
                className="pb-0 pt-0"
              ></Column>
            </DataTable>
          </div>
        </TabPanel>
        <TabPanel
          header={`Inactivos (${
            openSourceListInactive && openSourceListInactive.data
              ? openSourceListInactive.data.length
              : 0
          })`}
        >
          <div className="m-0">
            <DataTable
              value={openSourceListInactive ? openSourceListInactive.data : []}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              dataKey="id"
              ref={dt}
              // header={header}
              paginator
              emptyMessage="No data found."
              className="datatable-responsive"
              currentPageReportTemplate="Mostrando desde {first} hasta {last} de {totalRecords} fuentes abiertas"
              rows={10}
            >
              {/* <Column field="id" header="ID" sortable></Column>
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
              ></Column> */}
              <Column
                field="url"
                header="Url"
                sortable
                filter
                filterPlaceholder="Url"
              ></Column>
              <Column
                header="Acciones"
                body={inactiveActionBodyTemplate}
                className="pb-0 pt-0"
              ></Column>
            </DataTable>
          </div>
        </TabPanel>
      </TabView>
    </>
  );
};
