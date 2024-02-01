import * as Yup from "yup";

export const initialValues = {
  description: "",
  inputSearch: "",
  outputSearch: "",
  price: "0",
  url: "",
  typeSourceId: "",
  countryCode: "",
  defaultWorkflowId: "",
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
  submit: "Crear",
  success: "Se registro correctamente",
  error: "Error: ",
  goItem: "Visualizar item",
};

export const validationSchema = Yup.object({
  description: Yup.string("Ingresa la descripcion").min(
    4,
    "Descripcion debe ser 4 caracteres o mas"
  ),
  // .required("Descripcion requerida"),
  inputSearch: Yup.string("Ingresa el inputSearch").min(
    4,
    "inputSearch debe ser 4 caracteres o mas"
  ),
  outputSearch: Yup.string("Ingresa el outputSearch").min(
    4,
    "outputSearch debe ser 4 caracteres o mas"
  ),
  // .required("inputSearch requerido"),
  price: Yup.number("Ingresa el price").required("price requerido"),
  url: Yup.string("Ingresa el url").min(4, "url debe ser 4 caracteres o mas"),
  // .required("url requerido"),
  // typeSourceId: Yup.number("Ingresa el typeSourceId").required(
  //   "typeSourceId requerido"
  // ),
  countryCode: Yup.string("Ingresa el countryCode").required(
    "countryCode requerido"
  ),
  defaultWorkflowId: Yup.number("Ingresa el defaultWorkflowId").required(
    "defaultWorkflowId requerido"
  ),
});

export const errorCodes = {
  ERR_NETWORK: "Error de red",
};
