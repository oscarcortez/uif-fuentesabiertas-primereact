import { useState, useEffect, useRef } from "react";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { BreadCrumb } from "primereact/breadcrumb";

import catalogService from "../../service/catalogService";
import openSourceService from "../../service/openSourceService";
import countryService from "../../service/countryService";

import {
  initialValues,
  // validationSchema,
  labels,
  errorCodes,
} from "../../config/openSourceNewConfig";

import "./index.css";
import { OpenSourceForm } from "../../components/OpenSourceForm";
import { showSuccess, showError } from "../../components/CustomToast";
import { TitlePage } from "../../components/TitlePage";

export const OpenSourceNew = () => {
  const items = [{ label: "Fuentes Abiertas" }, { label: "Nuevo" }];
  const home = { icon: "pi pi-home", url: "/" };
  const title = "Nuevo item - Fuentes Abiertas";
  const createMutation = useMutation({
    mutationFn: (payload) => {
      return openSourceService.create(payload);
    },
  });

  const navigate = useNavigate();
  const toast = useRef(null);

  const [catalogTypeOpenSource, setCatalogTypeOpenSource] = useState([]);
  const [catalogWorkflow, setCatalogWorkflow] = useState([]);
  const [catalogCountry, setCatalogCountry] = useState([]);

  useEffect(() => {
    (async () => {
      setCatalogTypeOpenSource(
        await catalogService.findAllTipoFuentesAbiertasForDdl()
      );
    })();
    (async () => {
      setCatalogWorkflow(await catalogService.findAllWorkflowForDdl());
    })();
  }, []);

  useEffect(() => {
    setCatalogCountry(countryService.findAllForDdl());
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        description: values.description,
        inputSearch: values.inputSearch,
        outputSearch: values.outputSearch,
        countryCode: values.countryCode.code,
        name: values.name,
        price: parseFloat(values.price),
        url: values.url,
        typeSourceId: parseInt(values.typeSourceId.code),
        defaultWorkflowId: values.defaultWorkflowId.code,
      };

      createMutation.mutate(payload, {
        onSuccess: (data) => {
          if (values.goItem) {
            setTimeout(() => {
              navigate("/open-source/" + data.data.id);
            }, 1000);
          }
          showSuccess(toast, labels.success, payload.url);
          resetForm();
        },
        onError: (error) => {
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
      <OpenSourceForm
        labels={labels}
        formik={formik}
        mutation={createMutation}
        toast={toast}
        catalogTypeOpenSource={catalogTypeOpenSource}
        catalogWorkflow={catalogWorkflow}
        catalogCountry={catalogCountry}
      />
    </>
  );
};
