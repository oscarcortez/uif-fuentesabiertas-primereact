import * as Yup from "yup";

export const initialValues = {
  code: "",
  langEn: "",
  langEs: "",
  langPt: "",
};

export const labels = {
  code: "Code",
  langEn: "LangEn",
  langEs: "LangEs",
  langPt: "LangPt",
  submit: "Crear",
  success: "Se registro correctamente",
};

export const validationSchema = Yup.object({
  code: Yup.string("Ingresa el code")
    .min(4, "Code debe ser 4 caracteres o mas")
    .required("Code requerido"),
  langEn: Yup.string("Ingresa el langEn")
    .min(4, "LangEn debe ser 4 caracteres o mas")
    .required("LangEn requerido"),
  langEs: Yup.string("Ingresa el langEs")
    .min(4, "LangEs debe ser 4 caracteres o mas")
    .required("LangEs requerido"),
  langPt: Yup.string("Ingresa el langPt")
    .min(4, "LangPt debe ser 4 caracteres o mas")
    .required("LangPt requerido"),
});

export const errorCodes = {
  ERR_NETWORK: "Error de red",
};
