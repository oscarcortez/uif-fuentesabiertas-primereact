import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BreadCrumb } from "primereact/breadcrumb";
import { TitlePage } from "../../components/TitlePage";
import { DataView } from "primereact/dataview";

import countryService from "../../service/countryService";
import { CountryCard } from "../../components/CountryCard";

import { useCountryStore } from "../../stores/countryStore";
import { useNavigationStore } from "../../stores/navigationStore";

export const CountryList = () => {
  const navigate = useNavigate();
  const items = [{ label: "Fuentes Abiertas" }, { label: "Dashboard" }];
  const home = { icon: "pi pi-home", url: "/" };

  const title = "Seleccione un espacio de trabajo";

  const [catalogCountry, setCatalogCountry] = useState([]);
  const setCode = useCountryStore((state) => state.setCode);
  const navigateStore = useNavigationStore((state) => state.navigate);

  useEffect(() => {
    setCatalogCountry(countryService.findAllForDdl());
  }, []);

  const onClickCountry = (code) => {
    console.log("es el code: ", code);
    setCode(code);
    console.log(navigateStore);
    navigate(navigateStore);
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
