// import { useState, useEffect, useRef } from "react";
import { useRef } from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { TitlePage } from "../../components/TitlePage";

import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";

import experienceExchangeService from "../../service/experienceExchangeService";

import {
  initialValues,
  labels,
  validationSchema,
  errorCodes,
} from "../../config/experienceExchangeConfig";

import "./index.css";

import { ExperienceExchangeForm } from "../../components/ExperienceExchangeForm";
import { showSuccess, showError } from "../../components/CustomToast";

export const ExperienceExchangeNew = () => {
  const items = [{ label: "Fuentes Abiertas" }, { label: "Nuevo" }];
  const home = { icon: "pi pi-home", url: "/" };
  const title = "Nuevo item - Intercambio de Experiencias";

  const createMutation = useMutation({
    mutationFn: (payload) => {
      return experienceExchangeService.create(payload);
    },
  });

  // const navigate = useNavigate();
  const toast = useRef(null);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        ...values,
      };
      console.log(values);
      createMutation.mutate(payload, {
        onSuccess: (data) => {
          console.log(data);
          showSuccess(toast, labels.success, payload.url);
          resetForm();
        },
        onError: (error) => {
          console.log(error);
          const errorMessage = errorCodes[error.code];
          showError(toast, labels.error, errorMessage ?? error.code);
        },
      });
    },
  });
  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />
      <TitlePage title={title} />
      <ExperienceExchangeForm
        labels={labels}
        formik={formik}
        mutation={createMutation}
        toast={toast}
      />
    </>
  );
};
