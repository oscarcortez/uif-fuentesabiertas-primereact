import * as Yup from "yup";

export const labels = {
  title: "Fuentes Abiertas - Login",
  subtitle: "Por favor ingrese con los credenciales de acceso",
  email: "Email",
  password: "Password",
  submit: "Acceder",
  success: "Bienvenido: ",
  error: "Error: ",
};

export const paths = {
  headerImage: "/uif-logo.png",
};

export const submitDelay = 2000;

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = Yup.object({
  email: Yup.string("Ingresa tu correo")
    .email("Email invalido")
    .required("Email requerido"),
  password: Yup.string("Ingresa tu password")
    .min(4, "Password debe ser 4 caracteres o mas")
    .required("Password requerido"),
});

export const errorCodes = {
  ERR_BAD_REQUEST: "Los credenciales de acceso son incorrectos",
  ERR_NETWORK: "Error de red",
};
