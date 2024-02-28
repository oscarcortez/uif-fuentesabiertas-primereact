import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom"; //useNavigate,
import { useMutation } from "@tanstack/react-query";
import { BreadCrumb } from "primereact/breadcrumb";
import { TitlePage } from "../../components/TitlePage";

// import openSourceService from "../../service/openSourceService";
import experienceExchangeService from "../../service/experienceExchangeService";
import { ExperienceExchangeForm } from "../../components/ExperienceExchangeForm";
import { showSuccess, showError } from "../../components/CustomToast";

import {
  // initialValues,
  validationSchema,
  labels,
  errorCodes,
} from "../../config/openSourceEditConfig";

export const ExperienceExchangeEdit = () => {
  const { id } = useParams();

  const items = [
    { label: "Intercambio de Experiencias" },
    { label: "Editar" },
    { label: id },
  ];

  const home = { icon: "pi pi-home", url: "/" };
  const title = "Editar item - Intercambio de Experiencias";

  const [experienceExchangeItem, setExperienceExchange] = useState({});

  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    eventDate: "",
    hoursDuration: 0,
  });

  const updateMutation = useMutation({
    mutationFn: (id, payload) => {
      return experienceExchangeService.update(id, payload);
    },
  });

  // const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    (async () => {
      setExperienceExchange(await experienceExchangeService.findById(id));
    })();
  }, [id]);

  useEffect(() => {
    if (
      experienceExchangeItem.data &&
      Object.keys(experienceExchangeItem.data).length > 0
    ) {
      setInitialValues({
        ...experienceExchangeItem.data,
      });
    }
  }, [experienceExchangeItem.data]);

  // console.log("initialValues", initialValues);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    //validationSchema: validationSchema,
    onSubmit: async (values) => {
      //, { resetForm }
      console.log("values", values);
      const payload = {
        name: values.name,
        description: values.description,
        eventDate: values.eventDate,
        hoursDuration: values.hoursDuration,
      };

      updateMutation.mutate(
        { id, payload },
        {
          onSuccess: (data) => {
            console.log("data", data);
            // if (values.goItem) {
            //   setTimeout(() => {
            //     navigate("/open-source/" + data.data.id);
            //   }, 1000);
            // }
            showSuccess(toast, labels.success, payload.url);
          },
          onError: (error) => {
            const errorMessage = errorCodes[error.code];
            showError(toast, labels.error, errorMessage ?? error.code);
          },
        }
      );
    },
  });
  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />
      <TitlePage title={title} />
      <ExperienceExchangeForm
        labels={labels}
        formik={formik}
        mutation={updateMutation}
        toast={toast}
      />
    </>
  );
};
