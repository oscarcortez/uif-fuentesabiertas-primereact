//import axios from "axios";

import { BreadCrumb } from "primereact/breadcrumb";
import { Card } from "primereact/card";
import { TabView, TabPanel } from "primereact/tabview";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
// import { BO } from "country-flag-icons/react/3x2";
// import { Message } from "primereact/message";

import { useState, useEffect } from "react";
//import { authenticateService } from "../../service/authenticateService";
import openSourceService from "../../service/openSourceService";
import "./index.css";

export const OpenSourcePrettyList = () => {
  const items = [
    { label: "Fuentes Abiertas" },
    { label: "Listado (clientes)" },
  ];
  const home = { icon: "pi pi-home", url: "/" };

  const [openSourceList, setOpenSourceList] = useState([]);

  useEffect(() => {
    (async () => {
      setOpenSourceList(await openSourceService.findAll());
    })();
  }, []);

  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />
      {(openSourceList.data ? openSourceList.data.dataList : []).map(
        (openSource) => (
          <Card
            key={openSource.id}
            className="mt-4 bg-gray-100 mr-4 ml-4"
            title={openSource.url}
            subTitle={
              <>
                {openSource.isSuscribed ? (
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
                {/* {<BO title="United States" style={{ width: "30px" }} />} */}
              </>
            }
          >
            <TabView className="">
              <TabPanel header="Descripcion">
                <p className="m-0">{openSource.description}</p>
              </TabPanel>
              <TabPanel header="Detalles" className="">
                <div className="m-0 ">
                  <span
                    className="ml-3 mr-3"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <span className="mr-8">
                      <span className="font-bold">Busquedas:</span>{" "}
                      {openSource.inputSearch}
                      <Divider />
                      <span className="font-bold">Precio:</span>{" "}
                      {openSource.price}
                    </span>
                    <span>
                      <span className="font-bold">Suscrito:</span>{" "}
                      {openSource.isSuscribed ? "Si" : "No"}
                      <Divider />
                      <span className="font-bold">Ultimo Acceso:</span>{" "}
                      {openSource.txFecha.substring(0, 10)}
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
                      <Button
                        size="small"
                        label="Solicitar suscripcion"
                        outlined
                      />
                      <Divider />
                      <Button
                        size="small"
                        label="Notificar Link caido"
                        outlined
                      />
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
        )
      )}
    </>
  );
};
