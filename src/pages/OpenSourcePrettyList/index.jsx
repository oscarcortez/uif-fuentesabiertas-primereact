import { useState, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";

import { OpenSourceCard } from "../../components/OpenSourceCard";

import { BreadCrumb } from "primereact/breadcrumb";
import { DataView } from "primereact/dataview";

import openSourceForPrettyListService from "../../service/openSourceForPrettyListService";
import openSourceUserExternalLinkService from "../../service/openSourceUserExternalLinkService";

import "./index.css";

export const OpenSourcePrettyList = () => {
  const breadcrumbItems = [
    { label: "Fuentes Abiertas" },
    { label: "Listado (clientes)" },
  ];
  const home = { icon: "pi pi-home", url: "/" };

  const [openSourceForPrettyList, setOpenSourceForPrettyList] = useState([]);

  const createUserExternalLinkMutation = useMutation({
    mutationFn: (payload) => {
      return openSourceUserExternalLinkService.create(payload);
    },
  });

  useEffect(() => {
    (async () => {
      setOpenSourceForPrettyList(
        await openSourceForPrettyListService.findAll()
      );
    })();
  }, []);

  const buttonItems = (item) => [
    {
      label: "Solicitar suscripcion",
      icon: "pi pi-refresh",
      command: () => {
        console.log("solicitar suscripcion", item);
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

  // console.log("openSourceForPrettyList", openSourceForPrettyList);
  return (
    <>
      <BreadCrumb model={breadcrumbItems} home={home} className="text-sm" />
      <DataView
        value={openSourceForPrettyList?.data || []}
        layout="grid"
        itemTemplate={(item) => (
          <OpenSourceCard
            item={item}
            buttonItems={buttonItems}
            onJoin={onJoin}
          />
        )}
      />
    </>
  );
};
