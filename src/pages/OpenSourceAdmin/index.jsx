import { BreadCrumb } from "primereact/breadcrumb";

export const OpenSourceAdmin = () => {
  const items = [{ label: "Fuentes Abiertas" }, { label: "Administrar" }];
  const home = { icon: "pi pi-home", url: "/" };

  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />
    </>
  );
};
