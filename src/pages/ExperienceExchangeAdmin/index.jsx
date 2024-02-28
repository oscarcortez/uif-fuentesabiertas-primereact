import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { BreadCrumb } from "primereact/breadcrumb";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
// import { TabView, TabPanel } from "primereact/tabview";

import { TitlePage } from "../../components/TitlePage";

// import openSourceService from "../../service/openSourceService";
import experienceExchangeService from "../../service/experienceExchangeService";

import "./index.css";

export const ExperienceExchangeAdmin = () => {
  const navigate = useNavigate();

  const items = [
    { label: "Intercambio de Experiencias" },
    { label: "Administrar" },
  ];
  const home = { icon: "pi pi-home", url: "/" };

  const title = "Administracion - Intercambio de experiencias";

  const [experienceExchangeList, setExperienceExchangeList] = useState([]);

  // const dt = useRef(null);

  useEffect(() => {
    (async () => {
      setExperienceExchangeList(await experienceExchangeService.findAll());
    })();
  }, []);
  console.log("experienceExchangeList", experienceExchangeList);

  const actionBodyTemplate = (rowData) => {
    const iconStatus = rowData.status === "A" ? "pi pi-trash" : "pi pi-check";
    const severityStatus = rowData.status === "A" ? "danger" : "success";

    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded"
          text
          onClick={() => editAction(rowData)}
        />
        <Button
          icon={iconStatus}
          className="p-button-rounded"
          severity={severityStatus}
          text
          onClick={() => changeStatusAction(rowData)}
        />
      </>
    );
  };
  const changeStatusAction = async (rowData) => {
    if (rowData.status === "A") {
      await experienceExchangeService.updateStatus(rowData.id, "I");
    }
    if (rowData.status === "I") {
      await experienceExchangeService.updateStatus(rowData.id, "A");
    }
    // console.log("response", response);
    (async () => {
      setExperienceExchangeList(await experienceExchangeService.findAll());
    })();
  };

  const editAction = (rowData) => {
    navigate("/experience-exchange-edit/" + rowData.id);
  };

  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />
      <TitlePage title={title} />
      <DataTable
        value={experienceExchangeList ? experienceExchangeList.data : []}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        dataKey="id"
        // ref={dt}
        //header={header}
        paginator
        emptyMessage="No data found."
        className="datatable-responsive"
        currentPageReportTemplate="Mostrando desde {first} hasta {last} de {totalRecords} fuentes abiertas"
        rows={10}
      >
        <Column
          field="id"
          header="ID"
          sortable
          filter
          filterPlaceholder="id"
        ></Column>
        <Column
          field="name"
          header="Nombre"
          sortable
          filter
          filterPlaceholder="Nombre"
        ></Column>
        <Column
          field="description"
          header="Descripcion"
          sortable
          filter
          filterPlaceholder="Descripcion"
        ></Column>
        <Column
          field="status"
          header="Estado"
          body={(rowData) => (rowData.status === "A" ? "Activo" : "Inactivo")}
          sortable
          filter
          filterPlaceholder="Estado"
        ></Column>

        <Column
          header="Acciones"
          body={actionBodyTemplate}
          className="pb-0 pt-0"
        ></Column>
      </DataTable>
    </>
  );
};
