import { BreadCrumb } from "primereact/breadcrumb";

export const OpenSourcePrettyList = () => {
  const items = [
    { label: "Fuentes Abiertas" },
    { label: "Listado (clientes)" },
  ];
  const home = { icon: "pi pi-home", url: "/" };

  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />
    </>
  );
};
