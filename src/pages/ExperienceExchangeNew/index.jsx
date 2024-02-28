import { BreadCrumb } from "primereact/breadcrumb";
import { TitlePage } from "../../components/TitlePage";

import {
  initialValues,
  labels,
  validationSchema,
  errorCodes,
} from "../../components/experienceExchangeNewConfig";

export const ExperienceExchangeNew = () => {
  const items = [{ label: "Fuentes Abiertas" }, { label: "Nuevo" }];
  const home = { icon: "pi pi-home", url: "/" };
  const title = "Nuevo item - Intercambio de Experiencias";

  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />
      <TitlePage title={title} />
    </>
  );
};
