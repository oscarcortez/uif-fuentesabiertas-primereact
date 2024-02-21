import { useState, useEffect } from "react";
import { ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";

import { BreadCrumb } from "primereact/breadcrumb";
import { DataView } from "primereact/dataview";
import { TabView, TabPanel } from "primereact/tabview";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import { Button } from "primereact/button";

import { OpenSourceCard } from "../../components/OpenSourceCard";

import openSourceForPrettyListService from "../../service/openSourceForPrettyListService";
import openSourceUserExternalLinkService from "../../service/openSourceUserExternalLinkService";
import openSourceUserWorkflowService from "../../service/openSourceUserWorkflowService";
import { getUsername } from "../../service/authenticateService";

import { TitlePage } from "../../components/TitlePage";
import { useCountryStore } from "../../stores/countryStore";

import "./index.css";

export const OpenSourcePrettyList = () => {
  const createBySessionMutation = useMutation({
    mutationFn: (payload) => {
      return openSourceUserWorkflowService.createBySession(payload);
    },
  });

  const breadcrumbItems = [
    { label: "Fuentes Abiertas" },
    { label: "Listado (clientes)" },
  ];
  const home = { icon: "pi pi-home", url: "/" };
  const title = "Publicaciones - Fuentes Abiertas ";

  const [openSourceForPrettyList, setOpenSourceForPrettyList] = useState([]);
  const [typesForPrettyList, setTypesForPrettyList] = useState([]);
  const countryCodeStore = useCountryStore((state) => state.code);

  const createUserExternalLinkMutation = useMutation({
    mutationFn: (payload) => {
      return openSourceUserExternalLinkService.create(payload);
    },
  });

  useEffect(() => {
    (async () => {
      setOpenSourceForPrettyList(
        await openSourceForPrettyListService.findAllBySessionAndFree(
          countryCodeStore
        )
      );
    })();
  }, [countryCodeStore]);

  console.log("openSourceForPrettyList", openSourceForPrettyList);
  useEffect(() => {
    (async () => {
      setTypesForPrettyList(
        await openSourceForPrettyListService.findTypesBySessionAndFree(
          countryCodeStore
        )
      );
    })();
  }, [countryCodeStore]);

  console.log("typesForPrettyList", typesForPrettyList);
  const buttonItems = (item) => [
    {
      label: "Solicitar suscripcion",
      icon: "pi pi-refresh",
      command: () => {
        const payload = {
          openSourceId: item.openSourceId,
          userId: 0,
          workflowId: 0,
        };
        createBySessionMutation.mutate(payload, {
          onSuccess: () => {
            //data
            //showSuccess(toast, labels.success, payload.openSourceId);
            console.log("send", payload.openSourceId);
          },
          onError: (error) => {
            //const errorMessage = errorCodes[error.code];
            //showError(toast, labels.error, errorMessage ?? error.code);
            console.log("error", ErrorMessage ?? error.code);
          },
        });

        console.log("solicitar suscripcion", item.openSourceId, getUsername());
      },
    },
    {
      label: "Link caido",
      icon: "pi pi-times",
      command: () => {
        console.log("link caido");
      },
    },
    {
      label: "Comunicarme con un encargado",
      icon: "pi pi-user",
      command: () => {
        window.location.href = "https://reactjs.org/";
      },
    },
  ];

  const onJoin = (item) => {
    // console.log("onJoin", item);
    const payload = {
      openSourceId: item.openSourceId,
    };
    createUserExternalLinkMutation.mutate(payload, {
      onSuccess: () => {
        //data
        // console.log("onJoin response", data);
        (async () => {
          setOpenSourceForPrettyList(
            await openSourceForPrettyListService.findAllBySessionAndFree(
              countryCodeStore
            )
          );
        })();
        window.open(item.url, "_blank");
      },
    });
  };

  const openSourceLink = (rowData) => {
    if (rowData.typeList === "SIN ACCESO") return <p>Sin Acceso</p>;
    else
      return (
        <Button
          label="Entrar"
          onClick={(e) => {
            e.preventDefault();
            window.open(rowData.url, "_blank", "noopener,noreferrer");
          }}
          className="p-2"
          data-pr-tooltip={rowData.description}
        />
      );
  };
  //groupRowsBy="representative.name"
  return (
    <>
      <BreadCrumb model={breadcrumbItems} home={home} className="text-sm" />
      <TitlePage title={title} />
      <TabView>
        <TabPanel header="Resumido">
          {typesForPrettyList.map((type, index) => (
            <div key={index}>
              <h4 className="ml-3 text-blue-300">{type}</h4>
              <Tooltip
                target=".customer-tooltip"
                mouseTrack
                mouseTrackTop={15}
              />
              <DataTable
                value={openSourceForPrettyList.filter(
                  (item) => item.typeSource === type
                )}
                tableStyle={{ minWidth: "50rem" }}
              >
                {/* <Column field="id" header="id"></Column> */}
                {/* <Column field="description" header="description"></Column> */}
                <Column
                  field="spacedUrl"
                  header="url"
                  style={{ maxWidth: "200px", overflow: "auto" }}
                ></Column>
                <Column
                  header="Accion"
                  body={openSourceLink}
                  className="customer-tooltip"
                ></Column>
                {/* <Column header="Acciones" body={openSourceLink}></Column> */}
              </DataTable>
            </div>
          ))}
        </TabPanel>
        <TabPanel header="Tarjetas">
          {typesForPrettyList.map((type, index) => (
            <div key={index}>
              <h4 className="ml-3 text-blue-300">{type}</h4>
              <DataView
                value={openSourceForPrettyList.filter(
                  (item) => item.typeSource === type
                )}
                layout="grid"
                itemTemplate={(item) => (
                  <OpenSourceCard
                    item={item}
                    buttonItems={buttonItems}
                    onJoin={onJoin}
                    footer
                  />
                )}
              />
            </div>
          ))}
        </TabPanel>
      </TabView>
    </>
  );
};
