export const sidebarItems = [
  {
    label: "FUENTES ABIERTAS",
    items: [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus",
        navigate: "/open-source-new",
      },
      {
        label: "Administrar",
        icon: "pi pi-fw pi-list",
        navigate: "/open-source-admin",
      },
      {
        label: "Listado (clientes)",
        icon: "pi pi-fw pi-th-large",
        navigate: "/open-source-pretty-list",
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
