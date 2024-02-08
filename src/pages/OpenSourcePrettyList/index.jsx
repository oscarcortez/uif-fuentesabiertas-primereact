import { useState, useEffect } from "react";
import { ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";

import { BreadCrumb } from "primereact/breadcrumb";
import { DataView } from "primereact/dataview";

import { OpenSourceCard } from "../../components/OpenSourceCard";

import openSourceForPrettyListService from "../../service/openSourceForPrettyListService";
import openSourceUserExternalLinkService from "../../service/openSourceUserExternalLinkService";
import openSourceUserWorkflowService from "../../service/openSourceUserWorkflowService";
import { getUsername } from "../../service/authenticateService";

import { TitlePage } from "../../components/TitlePage";

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

  const createUserExternalLinkMutation = useMutation({
    mutationFn: (payload) => {
      return openSourceUserExternalLinkService.create(payload);
    },
  });

  useEffect(() => {
    (async () => {
      setOpenSourceForPrettyList(
        await openSourceForPrettyListService.findAllBySessionAndFree()
      );
    })();
  }, []);

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
          onSuccess: (data) => {
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
            await openSourceForPrettyListService.findAll()
          );
        })();
        //window.open(item.url, "_blank");
      },
    });
  };

  return (
    <>
      <BreadCrumb model={breadcrumbItems} home={home} className="text-sm" />
      <TitlePage title={title} />
      <DataView
        value={openSourceForPrettyList?.data || []}
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
    </>
  );
};
