import { useState, useEffect, useRef } from "react";

import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { BreadCrumb } from "primereact/breadcrumb";
import { TitlePage } from "../../components/TitlePage";

import catalogService from "../../service/catalogService";
import openSourceService from "../../service/openSourceService";
import countryService from "../../service/countryService";

import {
  // initialValues,
  // validationSchema,
  labels,
  errorCodes,
} from "../../config/openSourceEditConfig";

import "./index.css";
import { OpenSourceForm } from "../../components/OpenSourceForm";
import { showSuccess, showError } from "../../components/CustomToast";

export const OpenSourceEdit = () => {
  const { id } = useParams();
  const items = [
    { label: "Fuentes Abiertas" },
    { label: "Editar" },
    { label: id },
  ];
  const home = { icon: "pi pi-home", url: "/" };
  const title = "Editar item - Fuentes Abiertas";

  const [openSourceItem, setOpenSourceItem] = useState({});

  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedDefaultWorkflowId, setSelectedDefaultWorkflowId] = useState(
    {}
  );
  const [selectedTypeOpenSource, setSelectedTypeOpenSource] = useState({});

  const [initialValues, setInitialValues] = useState({
    description: "",
    inputSearch: "",
    outputSearch: "",
    price: "0",
    url: "",
    typeSourceId: {},
    countryCode: {},
    defaultWorkflowId: {},
    goItem: false,
  });

  const updateMutation = useMutation({
    mutationFn: (id, payload) => {
      return openSourceService.update(id, payload);
    },
  });

  const navigate = useNavigate();
  const toast = useRef(null);

  const [catalogTypeOpenSource, setCatalogTypeOpenSource] = useState([]);
  const [catalogWorkflow, setCatalogWorkflow] = useState([]);
  const [catalogCountry, setCatalogCountry] = useState([]);

  useEffect(() => {
    (async () => {
      setOpenSourceItem(await openSourceService.findById(id));
    })();
  }, [id]);

  useEffect(() => {
    if (openSourceItem.data && Object.keys(openSourceItem.data).length > 0) {
      setInitialValues({
        ...openSourceItem.data,
      });
    }
  }, [openSourceItem.data]);

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

  useEffect(() => {
    const initialCountry = catalogCountry.find(
      (country) => country.code === initialValues.countryCode
    );
    setSelectedCountry(initialCountry);
  }, [catalogCountry, initialValues.countryCode]);

  useEffect(() => {
    const initialDefaultWorkflowId = catalogWorkflow.find(
      (workflow) => workflow.code === initialValues.defaultWorkflowId
    );
    setSelectedDefaultWorkflowId(initialDefaultWorkflowId);
  }, [catalogWorkflow, initialValues.defaultWorkflowId]);

  useEffect(() => {
    const initialTypeOpenSource = catalogTypeOpenSource.find(
      (typeOpenSource) => typeOpenSource.code === initialValues.typeSourceId
    );
    setSelectedTypeOpenSource(initialTypeOpenSource);
  }, [catalogTypeOpenSource, initialValues.typeSourceId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      countryCode: selectedCountry,
      defaultWorkflowId: selectedDefaultWorkflowId,
      typeSourceId: selectedTypeOpenSource,
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      //, { resetForm }
      const payload = {
        description: values.description,
        inputSearch: values.inputSearch,
        outputSearch: values.outputSearch,
        countryCode: values.countryCode.code,
        price: parseFloat(values.price),
        url: values.url,
        typeSourceId: parseInt(values.typeSourceId.code),
        defaultWorkflowId: values.defaultWorkflowId.code,
      };
      //console.log("values", values);
      console.log("payload", payload);

      updateMutation.mutate(
        { id, payload },
        {
          onSuccess: (data) => {
            if (values.goItem) {
              setTimeout(() => {
                navigate("/open-source/" + data.data.id);
              }, 1000);
            }
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
      <OpenSourceForm
        labels={labels}
        formik={formik}
        mutation={updateMutation}
        toast={toast}
        catalogTypeOpenSource={catalogTypeOpenSource}
        catalogWorkflow={catalogWorkflow}
        catalogCountry={catalogCountry}
      />
    </>
  );
};
