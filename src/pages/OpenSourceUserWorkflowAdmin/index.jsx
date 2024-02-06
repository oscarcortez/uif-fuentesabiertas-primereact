import { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { BreadCrumb } from "primereact/breadcrumb";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { TabView, TabPanel } from "primereact/tabview";
import { Dropdown } from "primereact/dropdown";

import ReactCountryFlag from "react-country-flag";

import openSourceUserWorkflowService from "../../service/openSourceUserWorkflowService";
// import countryService from "../../service/countryService";
import catalogService from "../../service/catalogService";

export const OpenSourceUserWorkflowAdmin = () => {
  const updateMutation = useMutation({
    mutationFn: (id, payload) => {
      return openSourceUserWorkflowService.update(id, payload);
    },
  });

  const [catalogWorkflow, setCatalogWorkflow] = useState([]);

  useEffect(() => {
    (async () => {
      setCatalogWorkflow(await catalogService.findAllWorkflowForDdl2());
    })();
  }, []);

  const items = [{ label: "Fuentes Abiertas" }, { label: "Asignaciones" }];
  const home = { icon: "pi pi-home", url: "/" };

  const [
    openSourceUserWorkflowListActive,
    setOpenSourceUserWorkflowListActive,
  ] = useState([]);

  const dt = useRef(null);

  useEffect(() => {
    (async () => {
      setOpenSourceUserWorkflowListActive(
        await openSourceUserWorkflowService.findAll()
      );
    })();
  }, []);

  const handleCatalogueWorkflowChange = (e, rowData) => {
    console.log("e.value", e.value);
    console.log("rowData", rowData);
    const payload = {
      openSourceId: rowData.openSourceId,
      userId: rowData.userId,
      workflowId: e.value,
    };
    console.log("payload", payload);
    const id = rowData.id;
    updateMutation.mutate(
      { id, payload },
      {
        onSuccess: () => {
          //(data)
          (async () => {
            setOpenSourceUserWorkflowListActive(
              await openSourceUserWorkflowService.findAll()
            );
          })();
          console.log("update success");
        },
        onError: (error) => {
          console.log("error", error);
        },
      }
    );
  };

  console.log("catalogWorkflow", catalogWorkflow);
  return (
    <>
      <div className="p-grid">
        <div className="p-col-12">
          <BreadCrumb model={items} home={home} />
        </div>
        <div className="p-col-12">
          <DataTable
            value={
              openSourceUserWorkflowListActive.data
                ? openSourceUserWorkflowListActive.data.dataList
                : []
            }
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            dataKey="id"
            ref={dt}
            paginator
            emptyMessage="No data found."
            className="datatable-responsive"
            currentPageReportTemplate="Mostrando desde {first} hasta {last} de {totalRecords} fuentes abiertas"
            rows={10}
          >
            {/* <Column field="id" header="ID" sortable></Column> */}
            <Column
              //field="openSourceId"
              body={(rowData) => rowData.openSource.url}
              header="Fuente Abierta"
              sortable
            />
            <Column
              header="Pais"
              body={(rowData) => (
                <div className="flex align-items-center gap-2">
                  <ReactCountryFlag
                    countryCode={rowData.openSource.countryCode}
                    svg
                    style={{
                      width: "2em",
                      height: "2em",
                    }}
                  />
                  <span>{rowData.openSource.countryCode}</span>
                </div>
              )}
              sortable
            ></Column>

            <Column
              header="Usuario"
              body={(rowData) => rowData.user.username}
              sortable
            />
            <Column
              header="Estado"
              body={(rowData) =>
                rowData.status === "I" ? "Inactivo" : "Activo"
              }
              sortable
            ></Column>
            <Column
              header="Workflow"
              body={(rowData) => (
                <Dropdown
                  value={rowData.workflowId}
                  options={catalogWorkflow}
                  onChange={(e) => handleCatalogueWorkflowChange(e, rowData)}
                  placeholder="Select an Option"
                />
              )}
            />
          </DataTable>
        </div>
      </div>
    </>
  );
};
