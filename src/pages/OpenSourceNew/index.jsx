import { BreadCrumb } from "primereact/breadcrumb";

export const OpenSourceNew = () => {
  const items = [{ label: "Fuentes Abiertas" }, { label: "Nuevo" }];
  const home = { icon: "pi pi-home", url: "/" };

  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm mt-0" />
      afsdfasd
    </>
  );
};
