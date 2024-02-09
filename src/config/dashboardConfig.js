export const topbarItems = {
  leftPopupIcon: "bars",
  title: "FUENTES ABIERTAS",
  rightPopupIcon: "cog",
};

const leftbarItemsAdministrador = [
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
        label: "Listado",
        icon: "pi pi-fw pi-th-large",
        navigate: "/open-source-pretty-list",
      },
      {
        label: "Asignaciones",
        icon: "pi pi-fw pi-th-large",
        navigate: "/open-source-user-workflow-admin",
      },
    ],
  },
];

const leftbarItemsCliente = [
  {
    label: "FUENTES ABIERTAS",
    items: [
      {
        label: "Listado",
        icon: "pi pi-fw pi-th-large",
        navigate: "/open-source-pretty-list",
      },
      {
        label: "Mis Solicitudes",
        icon: "pi pi-fw pi-th-large",
        navigate: "/open-source-user-workflow-by-session",
      },
    ],
  },
];

export const leftbarItems = {
  Administrador: leftbarItemsAdministrador,
  Cliente: leftbarItemsCliente,
};

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
