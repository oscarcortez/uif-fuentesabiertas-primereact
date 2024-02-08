import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { BreadCrumb } from "primereact/breadcrumb";
import { OpenSourceCard } from "../../components/OpenSourceCard";

import openSourceForPrettyListService from "../../service/openSourceForPrettyListService";

export const OpenSourceItem = () => {
  const { id } = useParams();
  console.log("id", id);
  const items = [
    { label: "Fuentes Abiertas" },
    { label: "Item" },
    { label: id },
  ];
  const home = { icon: "pi pi-home", url: "/" };

  const [openSourceForPrettyListItem, setOpenSourceForPrettyListItem] =
    useState({});

  useEffect(() => {
    (async () => {
      const response = await openSourceForPrettyListService.findByOpenSourceId(
        id
      );
      setOpenSourceForPrettyListItem(response.data);
      console.log("response.data", response.data);
    })();
  }, [id]);

  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />
      <OpenSourceCard item={openSourceForPrettyListItem} />
    </>
  );
};
