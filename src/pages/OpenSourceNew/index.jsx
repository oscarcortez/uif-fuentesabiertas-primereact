import { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
// import { ToggleButton } from "primereact/togglebutton";
import { Dropdown } from "primereact/dropdown";
// import { Checkbox } from "primereact/checkbox";
import { InputNumber } from "primereact/inputnumber";
// import { InputTextarea } from "primereact/inputtextarea";
import { InputSwitch } from "primereact/inputswitch";
import { Panel } from "primereact/panel";
import { BreadCrumb } from "primereact/breadcrumb";
import { Editor } from "primereact/editor";
import { Toast } from "primereact/toast";
import { Ripple } from "primereact/ripple";
// import { ChevronDownIcon } from "primereact/icons/chevrondown";
// import { ChevronRightIcon } from "primereact/icons/chevronright";

import ReactCountryFlag from "react-country-flag";

import catalogService from "../../service/catalogService";
import openSourceService from "../../service/openSourceService";

// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  initialValues,
  validationSchema,
  labels,
  errorCodes,
} from "../../config/openSourceNewConfig";

import "./index.css";

export const OpenSourceNew = () => {
  const countries = [
    { name: "Seleccione un Pais", code: "" },
    { name: "Australia", code: "AU" },
    { name: "Brazil", code: "BR" },
    { name: "China", code: "CN" },
    { name: "Egypt", code: "EG" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Japan", code: "JP" },
    { name: "Spain", code: "ES" },
    { name: "United States", code: "US" },
  ];

  const countryTemplate = ({ code, name }) => {
    return (
      <div className="p-clearfix">
        <ReactCountryFlag countryCode={code} svg className="mr-2" />
        <span
          style={{
            float: "center",
            margin: ".5em .25em 0 0",
          }}
        >
          {name}
        </span>
      </div>
    );
  };

  const selectedCountryTemplate = (option) => {
    if (!option) return;

    return (
      <div className="p-clearfix">
        <ReactCountryFlag countryCode={option.code} svg className="mr-2" />
        <span>{option.name}</span>
      </div>
    );
  };

  const navigate = useNavigate();
  const toast = useRef(null);
  const items = [{ label: "Fuentes Abiertas" }, { label: "Nuevo" }];
  const home = { icon: "pi pi-home", url: "/" };

  const [catalogTypeOpenSource, setCatalogTypeOpenSource] = useState([]);
  const [catalogWorkflow, setCatalogWorkflow] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const showSuccess = (message) => {
    toast.current.show({
      severity: "success",
      summary: "Bienvenido",
      detail: message,
    });
  };

  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
    });
  };

  useEffect(() => {
    (async () => {
      setCatalogTypeOpenSource(
        await catalogService.findAllTipoFuentesAbiertasForDdl()
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setCatalogWorkflow(await catalogService.findAllWorkflowForDdl());
    })();
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("values", values);
      // setIsLoading(true);

      const payload = {
        description: values.description,
        inputSearch: values.inputSearch,
        countryCode: values.countryCode.code,
        workflowId: parseInt(values.workflowId.code),
        price: parseFloat(values.price),
        url: values.url,
        typeSourceId: parseInt(values.typeSourceId.code),
        personId: 10,
      };

      // console.log("payload", payload);
      try {
        const response = await openSourceService.create(payload);
        // console.log("response", response);
        // console.log("response2", response.data);
        // console.log("goItem", values.goItem);
        // console.log("id", response.data.id);
        if (values.goItem) {
          navigate("/open-source/" + response.data.id);
        }
        showSuccess(labels.success);
      } catch (error) {
        const errorMessage = errorCodes[error.code];
        showError(errorMessage ?? error.code);
        setIsLoading(false);
      }
      setIsLoading(false);
      resetForm();
    },
  });

  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />

      <form
        onSubmit={formik.handleSubmit}
        className="pages-panel card flex flex-column"
      >
        <div className="bg-black-alpha-10 container">
          <div
            className="surface-card p-4 w-full bg-blue-800 column"
            style={{ flex: "2" }}
          >
            <div className="p-inputgroup flex-1 mb-3">
              <span className="p-inputgroup-addon">
                <i className="pi pi-globe"></i>
              </span>
              <InputText
                type="text"
                id="url"
                name="url"
                placeholder={labels.url}
                autoComplete="url"
                {...formik.getFieldProps("url")}
                className={classNames("w-full", {
                  "p-invalid": formik.errors.url && formik.touched.url,
                })}
              />
            </div>
            <div className="p-inputgroup flex-1 mb-3">
              <span className="p-inputgroup-addon">
                <i className="pi pi-search"></i>
              </span>
              <InputText
                type="text"
                id="inputSearch"
                name="inputSearch"
                placeholder={labels.inputSearch}
                autoComplete="url"
                {...formik.getFieldProps("inputSearch")}
                className={classNames("w-full", {
                  "p-invalid":
                    formik.errors.inputSearch && formik.touched.inputSearch,
                })}
              />
            </div>
            <Editor
              style={{ height: "320px" }}
              value={formik.values.description}
              onTextChange={(e) => {
                formik.setFieldValue("description", e.htmlValue);
              }}
            />
          </div>

          <div
            className="surface-card p-4 w-full bg-blue-800 column"
            style={{ flex: "1" }}
          >
            <Panel header="Precio" className="my-panel">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-dollar"></i>
                </span>
                <InputNumber
                  inputId="in_price"
                  name="price"
                  placeholder={labels.price}
                  value={formik.values.price}
                  onValueChange={(e) => {
                    formik.setFieldValue("price", e.value);
                  }}
                  showButtons
                  min={0}
                  className={classNames("w-full", {
                    "p-invalid": formik.errors.price && formik.touched.price,
                  })}
                />
              </div>
            </Panel>
            <Panel header="Tipo de fuente" className="my-panel">
              <Dropdown
                id="typeSourceId"
                name="typeSourceId"
                value={formik.values.typeSourceId}
                onChange={formik.handleChange}
                options={catalogTypeOpenSource}
                placeholder="Tipo de fuente abierta"
                optionLabel="name"
                className="w-full"
              />
            </Panel>
            <Panel header="Acceso por defecto" className="my-panel">
              <Dropdown
                id="workflowId"
                name="workflowId"
                value={formik.values.workflowId}
                onChange={formik.handleChange}
                options={catalogWorkflow}
                placeholder="Workflow"
                optionLabel="name"
                className="w-full"
              />
            </Panel>
            <Panel header={labels.countryCodeHeader} className="my-panel">
              <Dropdown
                id="countryCode"
                name="countryCode"
                value={formik.values.countryCode}
                //onChange={formik.handleChange}
                onChange={(e) => formik.setFieldValue("countryCode", e.value)}
                options={countries}
                optionLabel="name"
                // placeholder={labels.countryCodePlaceHolder}
                placeholder="Select a City"
                className="w-full"
                style={{ width: "100%" }}
                itemTemplate={countryTemplate}
                valueTemplate={selectedCountryTemplate}
              />
            </Panel>
            <Panel className="my-panel w-full">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{labels.goItem}</span>
                <InputSwitch
                  id="goItem"
                  name="goItem"
                  checked={formik.values.goItem}
                  onChange={formik.handleChange}
                />
              </div>
            </Panel>

            <div className="card flex justify-content-center mt-3">
              <span className="p-buttonset">
                <Button
                  type="submit"
                  label={labels.submit}
                  loading={isLoading}
                  icon="pi pi-plus"
                />
                <Button
                  type="reset"
                  label="Reset"
                  icon="pi pi-trash"
                  onClick={formik.handleReset}
                  outlined
                />
              </span>
            </div>

            {/* <span className="p-float-label w-full mb-5">
                <Checkbox
                  inputId="isSuscribed"
                  name="isSuscribed"
                  checked={formik.values.isSuscribed}
                  onChange={formik.handleChange}
                />
                <label htmlFor="isSuscribed"> {labels.isSuscribed}</label>
              </span> */}
            {/* <div className="p-float-label w-full mb-5">
                <ToggleButton
                  id="goItem"
                  name="goItem"
                  checked={formik.values.goItem}
                  onChange={formik.handleChange}
                />
                <label htmlFor="goItem"> {labels.goItem}</label>
              </div> */}
            {/* <Button
              type="submit"
              label={labels.submit}
              loading={isLoading}
              icon="pi pi-plus"
              className="w-full"
            /> */}
          </div>

          <Toast ref={toast} position="center" />
        </div>
      </form>
    </>
  );
};
