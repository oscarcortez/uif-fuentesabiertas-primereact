// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BreadCrumb } from "primereact/breadcrumb";
import { TitlePage } from "../../components/TitlePage";
import { DataView } from "primereact/dataview";

// import countryService from "../../service/countryService";
//import { CountryCard } from "../../components/CountryCard";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import { useNavigationStore } from "../../stores/navigationStore";

export const Dashboard = () => {
  const items = [{ label: "Fuentes Abiertas" }, { label: "Dashboard" }];
  const home = { icon: "pi pi-home", url: "/" };

  const title = "Seleccione un Modulo";

  const navigate = useNavigate();
  // const [catalogCountry, setCatalogCountry] = useState([]);
  const setNavigate = useNavigationStore((state) => state.setNavigate);

  // useEffect(() => {
  //   setCatalogCountry(countryService.findAllForDdl());
  // }, []);

  const modules = [
    {
      title: "AMBIENTE DE ACCESO A FUENTES ABIERTAS DE INFORMACIÓN",
      logo: "logo-world.png",
      description:
        "Visite los accesos a informacion publica de todos los paises integrantes del SICAD",
      navigate: "/open-source-pretty-list",
    },
    {
      title: "AMBIENTE DE INTERCAMBIO DE EXPERIENCIAS",
      logo: "logo-experience.png",
      description:
        "Foro Colaborativo para compartir experiencias o consultas con el resto del Campus.",
      navigate: "/dashboard",
    },
    {
      title: "AMBIENTE DE INTERCAMBIO DE DOCUMENTACIÓN",
      logo: "logo-documentation.png",
      description:
        "Encuentra documentación compartida por los miembros del CICAD.",
      navigate: "/dashboard",
    },
  ];

  const onClickModule = (item) => {
    console.log("es el item: ", item);
    //setCode(code);
    setNavigate(item.navigate);
    navigate("/country-list");
  };

  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />
      <TitlePage title={title} />
      <DataView
        value={modules || []}
        layout="grid"
        itemTemplate={(item) => (
          <Card
            // title={item.title}
            subTitle={item.title}
            footer={
              <Button
                label="Ingresar"
                icon="pi pi-check"
                onClick={() => onClickModule(item)}
              />
            }
            header={<img alt="Card" src={item.logo} />}
            className="md:w-17rem mr-3"
          ></Card>
        )}
      />
    </>
  );
};
