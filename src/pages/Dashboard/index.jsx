import { useEffect, useState } from "react";

import { BreadCrumb } from "primereact/breadcrumb";
import { TitlePage } from "../../components/TitlePage";
import { DataView } from "primereact/dataview";

import countryService from "../../service/countryService";
import { CountryCard } from "../../components/CountryCard";

export const Dashboard = () => {
  const items = [{ label: "Fuentes Abiertas" }, { label: "Dashboard" }];
  const home = { icon: "pi pi-home", url: "/" };

  const title = "Seleccione un Pais";

  const [catalogCountry, setCatalogCountry] = useState([]);

  useEffect(() => {
    setCatalogCountry(countryService.findAllForDdl());
  }, []);

  const onClickCountry = (code) => {
    console.log("es el code: ", code);
  };
  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />
      <TitlePage title={title} />
      <DataView
        value={catalogCountry || []}
        layout="grid"
        itemTemplate={(item) => (
          <CountryCard
            name={item.name}
            code={item.code}
            onClick={onClickCountry}
          />
        )}
      />
    </>
  );
};
