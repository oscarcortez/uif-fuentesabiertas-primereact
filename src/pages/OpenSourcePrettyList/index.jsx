import { useState, useEffect } from "react";

import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
// import { TabView, TabPanel } from "primereact/tabview";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
// import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { DataView } from "primereact/dataview";
// import { Ripple } from "primereact/ripple";
import ReactCountryFlag from "react-country-flag";

import openSourceService from "../../service/openSourceService";
import openSourceForPrettyListService from "../../service/openSourceForPrettyListService";

import "./index.css";

export const OpenSourcePrettyList = () => {
  const breadcrumbItems = [
    { label: "Fuentes Abiertas" },
    { label: "Listado (clientes)" },
  ];
  const home = { icon: "pi pi-home", url: "/" };

  const [openSourceList, setOpenSourceList] = useState([]);
  const [openSourceForPrettyList, setOpenSourceForPrettyList] = useState([]);

  useEffect(() => {
    (async () => {
      setOpenSourceList(await openSourceService.findAll());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setOpenSourceForPrettyList(
        await openSourceForPrettyListService.findAll()
      );
    })();
  }, []);

  const buttonItems = [
    {
      label: "Solicitar suscripcion",
      icon: "pi pi-refresh",
      command: () => {
        console.log("solicitar suscripcion");
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
    console.log(item.url);
    window.open(item.url, "_blank");
    //window.open("http://" + item.url, "_blank");
    //window.location.href = "https://reactjs.org/";
  };

  // const footer = (
  //   <>
  //     <SplitButton
  //       label="Entrar"
  //       icon="pi pi-link"
  //       // className="p-disabled"
  //       onClick={onJoin}
  //       model={buttonItems}
  //       rounded
  //     />
  //   </>
  // );
  console.log("openSourceForPrettyList", openSourceForPrettyList);
  return (
    <>
      <BreadCrumb model={breadcrumbItems} home={home} className="text-sm" />

      <DataView
        value={openSourceForPrettyList ? openSourceForPrettyList.data : []}
        layout="grid"
        itemTemplate={(item) => (
          <Card
            key={item.id}
            title={item.shortUrl}
            subTitle={
              <>
                <Tag
                  icon={item.typeListTagIcon}
                  value={item.typeList}
                  className={item.typeListTagBackground}
                ></Tag>
              </>
            }
            footer={
              <SplitButton
                label="Entrar"
                icon="pi pi-link"
                className={item.buttonClassname}
                onClick={() => onJoin(item)}
                model={buttonItems}
                rounded
              />
            }
            className="md:w-25rem mr-2 mt-2"
          >
            <div className="m-0">
              <p>
                <span className="font-bold mr-2">URL:</span>
                {item.spacedUrl}
              </p>
              <p>
                <span className="font-bold mr-2">Pais:</span>
                <ReactCountryFlag
                  countryCode={item.countryCode}
                  svg
                  style={{
                    width: "2em",
                    height: "1.5em",
                  }}
                  className="mr-2"
                />
                <span>{item.countryCode}</span>
              </p>
              <p>
                <span className="font-bold mr-2">Busquedas:</span>
                {item.entryValue}
              </p>
              <p>
                <span className="font-bold mr-2">Salida:</span>
                {item.exitValue}
              </p>
              <p>
                <span className="font-bold mr-2">Precio:</span>
                {item.price}
              </p>
              <p>
                <span className="font-bold mr-2">Ultimo acceso:</span>
                {item.lastJoin}
              </p>
              <p>
                <span className="font-bold mr-2">Accesos:</span>
                {item.joins}
              </p>
              <Divider />
            </div>
            <p
              className="m-0"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </Card>
        )}
      />
    </>
  );
};
