import PropTypes from "prop-types";
// import { useRef, useState } from "react";
// import { useFormik } from "formik";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { Panel } from "primereact/panel";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
// import { useNavigate } from "react-router-dom";
// import { BreadCrumb } from "primereact/breadcrumb";
import classNames from "classnames";
// import ReactCountryFlag from "react-country-flag";
// import { useEffect } from "react";

export const OpenSourceForm = ({
  labels,
  formik,
  mutation,
  toast,
  catalogTypeOpenSource,
  catalogWorkflow,
  catalogCountry,
}) => {
  // const countryTemplate = ({ code, name }) => {
  //   return (
  //     <div className="p-clearfix">
  //       {code !== "" && (
  //         <ReactCountryFlag countryCode={code} svg className="mr-2" />
  //       )}

  //       <span
  //         style={{
  //           float: "center",
  //           margin: ".5em .25em 0 0",
  //         }}
  //       >
  //         {name}
  //       </span>
  //     </div>
  //   );
  // };

  // TODO fix it
  // const selectedCountryTemplate = (option) => {
  //   if (!option) return;

  //   return (
  //     <div className="p-clearfix">
  //       <ReactCountryFlag countryCode={option.code} svg className="mr-2" />
  //       <span>{option.name}</span>
  //     </div>
  //   );
  // };

  return (
    <>
      <h3 className="ml-3 text-gray-600">Nueva Fuente Abierta</h3>
      <Divider />
      <form
        onSubmit={formik.handleSubmit}
        className="pages-panel card flex flex-column"
      >
        <div className="form-container">
          <div className="form-column">
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
            <div className="p-inputgroup flex-1 mb-3">
              <span className="p-inputgroup-addon">
                <i className="pi pi-search"></i>
              </span>
              <InputText
                type="text"
                id="outputSearch"
                name="outputSearch"
                placeholder={labels.outputSearch}
                autoComplete="url"
                {...formik.getFieldProps("outputSearch")}
                className={classNames("w-full", {
                  "p-invalid":
                    formik.errors.outputSearch && formik.touched.outputSearch,
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
                id="defaultWorkflowId"
                name="defaultWorkflowId"
                //value="Solicitar Suscripcion"
                value={formik.values.defaultWorkflowId}
                onChange={formik.handleChange}
                options={catalogWorkflow}
                placeholder="Workflow"
                optionLabel="name"
                className="w-full"
              />
            </Panel>
            <Panel header={labels.countryCodeHeader} className="my-panel">
              <Dropdown
                inputId="countryCode"
                name="countryCode"
                value={formik.values.countryCode}
                //value={{ name: "Peru", code: "PE" }}
                options={catalogCountry}
                optionLabel="name"
                placeholder="Select a Country"
                onChange={(e) => {
                  formik.setFieldValue("countryCode", e.value);
                }}
                className="w-full"
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
                  loading={mutation.isPending}
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
          </div>

          <Toast ref={toast} position="center" />
        </div>
      </form>
    </>
  );
};

OpenSourceForm.propTypes = {
  labels: PropTypes.object.isRequired,
  formik: PropTypes.object.isRequired,
  mutation: PropTypes.object.isRequired,
  toast: PropTypes.object.isRequired,
  catalogTypeOpenSource: PropTypes.array.isRequired,
  catalogWorkflow: PropTypes.array.isRequired,
  catalogCountry: PropTypes.array.isRequired,
};
