// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export const sidebarItems = [
  {
    label: "FUENTES ABIERTAS",
    items: [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus",
        navigate: "/open-source-new",
        // command: () => {
        //   console.log("Nuevo");
        // },
      },
      {
        label: "Administrar",
        icon: "pi pi-fw pi-list",
        navigate: "/open-source-admin",
        // command: () => {
        //   console.log("Listado");
        // },
      },
      {
        label: "Listado (clientes)",
        icon: "pi pi-fw pi-th-large",
        navigate: "/open-source-pretty-list",
        // command: () => {
        //   console.log("Listado cards");
        // },
      },
    ],
  },
  {
    label: "INTERCAMBIO DE EXPERIENCIAS",
    items: [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus",
        command: () => {
          console.log("Nuevo");
        },
      },
      {
        label: "Listado",
        icon: "pi pi-fw pi-list",
        command: () => {
          console.log("Listado");
        },
      },
      {
        label: "Listado cards",
        icon: "pi pi-fw pi-th-large",
        command: () => {
          console.log("Listado cards");
        },
      },
    ],
  },
];
