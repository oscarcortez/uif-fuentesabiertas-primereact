import * as Yup from "yup";

export const initialValues = {
  description: "",
  inputSearch: "",
  isSuscribed: false,
  price: "",
  url: "",
  typeSourceId: "",
  personId: 0,
  goItem: false,
};

export const labels = {
  description: "Descripcion",
  inputSearch: "Valor de busqueda",
  outputSearch: "Resultado de busqueda",
  price: "Precio",
  url: "Url",
  typeSourceId: "Tipo de fuente",
  countryCodeHeader: "Pais",
  countryCodePlaceHolder: "Selecciona un pais",
  defaultWorkflowId: "Workflow",
  submit: "Actualizar",
  success: "Se actualizo correctamente",
  error: "Error: ",
  goItem: "Visualizar item",
};

export const validationSchema = Yup.object({
  description: Yup.string("Ingresa la descripcion")
    .min(4, "Descripcion debe ser 4 caracteres o mas")
    .required("Descripcion requerida"),
  inputSearch: Yup.string("Ingresa el inputSearch")
    .min(4, "inputSearch debe ser 4 caracteres o mas")
    .required("inputSearch requerido"),
  isSuscribed: Yup.boolean("Ingresa el isSuscribed").required(
    "isSuscribed requerido"
  ),
  price: Yup.number("Ingresa el price").required("price requerido"),
  url: Yup.string("Ingresa el url")
    .min(4, "url debe ser 4 caracteres o mas")
    .required("url requerido"),
  // typeSourceId: Yup.number("Ingresa el typeSourceId").required(
  //   "typeSourceId requerido"
  // ),
  personId: Yup.number("Ingresa el personId").required("personId requerido"),
});

export const errorCodes = {
  ERR_NETWORK: "Error de red",
};
