import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

import openSourceService from "../../service/openSourceService";

export const OpenSourceItem = () => {
  const { id } = useParams();
  console.log("id", id);
  const items = [
    { label: "Fuentes Abiertas" },
    { label: "Item" },
    { label: id },
  ];
  const home = { icon: "pi pi-home", url: "/" };

  const [openSourceItem, setOpenSourceItem] = useState({});

  useEffect(() => {
    (async () => {
      const response = await openSourceService.findById(id);
      setOpenSourceItem(response.data);
      console.log("response.data", response.data);
    })();
  }, [id]);

  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />
      {openSourceItem.url} {openSourceItem.isSuscribed ? "Si" : "No"}
      <Card
        className="mt-4 bg-gray-100 mr-4 ml-4"
        title={openSourceItem.url}
        subTitle={
          <>
            {openSourceItem.isSuscribed ? (
              <Tag
                icon="pi pi-check"
                value="Suscrito"
                className="bg-green-300"
              ></Tag>
            ) : (
              <Tag
                icon="pi pi-check"
                value="NO Suscrito"
                className="bg-red-300"
              ></Tag>
            )}
          </>
        }
      >
        <TabView className="">
          <TabPanel header="Descripcion">
            <div
              className="m-0"
              dangerouslySetInnerHTML={{ __html: openSourceItem.description }}
            />
          </TabPanel>
          <TabPanel header="Detalles" className="">
            <div className="m-0 ">
              <span
                className="ml-3 mr-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <span className="mr-8">
                  <span className="font-bold">Busquedas:</span>{" "}
                  {openSourceItem.inputSearch}
                  <Divider />
                  <span className="font-bold">Precio:</span>{" "}
                  {openSourceItem.price}
                </span>
                <span>
                  <span className="font-bold">Suscrito:</span>{" "}
                  {openSourceItem.isSuscribed ? "Si" : "No"}
                  <Divider />
                  <span className="font-bold">Ultimo Acceso:</span>{" "}
                </span>
              </span>
            </div>
          </TabPanel>
          <TabPanel header="Acciones">
            <div className="m-0">
              <span
                className="ml-3 mr-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div className="mr-8">
                  <Button size="small" label="Solicitar suscripcion" outlined />
                  <Divider />
                  <Button size="small" label="Notificar Link caido" outlined />
                </div>
                <div>
                  <Button
                    size="small"
                    label="Comunicarme con un encargado"
                    outlined
                  />
                  <Divider />
                  <Button size="small" label="Ingresar al link" />
                </div>
              </span>
            </div>
          </TabPanel>
        </TabView>
      </Card>
    </>
  );
};
