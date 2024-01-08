export const topbarItems = {
  leftPopupIcon: "bars",
  title: "FUENTES ABIERTAS",
  rightPopupIcon: "cog",
};

export const leftbarItems = [
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
  // {
  //   label: "INTERCAMBIO DE EXPERIENCIAS",
  //   items: [
  //     {
  //       label: "Nuevo",
  //       icon: "pi pi-fw pi-plus",
  //       command: () => {
  //         console.log("Nuevo");
  //       },
  //     },
  //     {
  //       label: "Listado",
  //       icon: "pi pi-fw pi-list",
  //       command: () => {
  //         console.log("Listado");
  //       },
  //     },
  //     {
  //       label: "Listado cards",
  //       icon: "pi pi-fw pi-th-large",
  //       command: () => {
  //         console.log("Listado cards");
  //       },
  //     },
  //   ],
  // },
];

export const rightbarItems = {
  menuItems: [
    {
      label: "Mi perfil",
      icon: "pi pi-fw pi-user",
      navigate: "/profile",
      command: () => {
        console.log("/profile");
      },
    },
    {
      label: "Acerca de",
      icon: "pi pi-fw pi-desktop",
      navigate: "/about",
    },
    {
      label: "Salir",
      icon: "pi pi-fw pi-power-off",
      navigate: "/login",
      isLogout: true,
    },
  ],
  title: "Bienvenido",
  languageItems: [
    {
      countryCode: "ES",
      label: "Español",
    },
    {
      countryCode: "US",
      label: "English",
    },
    {
      countryCode: "BR",
      label: "Portugues",
    },
  ],
};
