import * as Yup from "yup";

export const initialValues = {
  name: "",
  description: "",
  eventDate: "",
  hoursDuration: "0",
};

export const labels = {
  name: "Nombre",
  description: "Descripcion",
  eventDate: "Fecha",
  hoursDuration: "Duracion",
  submit: "Crear",
  success: "Se registro correctamente",
  error: "Error: ",
};

export const validationSchema = Yup.object({
  name: Yup.string("Ingresa el nombre").min(
    4,
    "Nombre debe ser 4 caracteres o mas"
  ),
  description: Yup.string("Ingresa la descripcion").min(
    4,
    "Descripcion debe ser 4 caracteres o mas"
  ),
  eventDate: Yup.date("Ingresa la fecha").required("Fecha requerida"),
  hoursDuration: Yup.number("Ingresa la duracion").required(
    "Duracion requerida"
  ),
});

export const errorCodes = {
  ERR_NETWORK: "Error de red",
};
