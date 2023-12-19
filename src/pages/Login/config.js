import * as Yup from "yup";

export const labels = {
  title: "Fuentes Abiertas - Login",
  subtitle: "Por favor ingrese con los credenciales de acceso",
  email: "Email",
  password: "Password",
  submit: "Acceder",
};

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
