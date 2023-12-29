import classNames from "classnames";
import { useState, useEffect } from "react";
import { useFormik } from "formik";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import { BreadCrumb } from "primereact/breadcrumb";

import catalogService from "../../service/catalogService";
import openSourceService from "../../service/openSourceService";

import {
  initialValues,
  validationSchema,
  labels,
  errorCodes,
} from "../../config/openSourceNewConfig";

export const OpenSourceNew = () => {
  const items = [{ label: "Fuentes Abiertas" }, { label: "Nuevo" }];
  const home = { icon: "pi pi-home", url: "/" };

  const [catalogTypeOpenSource, setCatalogTypeOpenSource] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    (async () => {
      setCatalogTypeOpenSource(
        await catalogService.findAllTipoFuentesAbiertasForDdl()
      );
    })();
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      const payload = {
        description: values.description,
        inputSearch: values.inputSearch,
        isSuscribed: values.isSuscribed,
        price: parseFloat(values.price),
        url: values.url,
        typeSourceId: parseInt(values.typeSourceId.code),
        personId: 10,
      };
      console.log("payload", payload);

      try {
        setErrorMessage("");
        openSourceService.create(payload);
        setSuccessMessage(labels.success);
        setTimeout(() => {
          setSuccessMessage("");
        }, 2500);
      } catch (error) {
        const errorMessage = errorCodes[error.code];
        if (errorMessage) {
          setErrorMessage(errorMessage);
        } else {
          setErrorMessage(error.code);
        }
        setIsLoading(false);
      }
      setIsLoading(false);
      resetForm();
    },
  });

  return (
    <>
      <BreadCrumb model={items} home={home} className="text-sm" />

      <div className="flex align-items-center justify-content-center mt-6">
        <div className="surface-card p-4 w-full lg:w-6 bg-blue-800">
          <form
            onSubmit={formik.handleSubmit}
            className="pages-panel card flex flex-column"
          >
            <div className="text-center">
              <span className="p-float-label p-input-icon-left w-full mb-6">
                <i className="pi pi-file" />
                <InputTextarea
                  type="text"
                  id="description"
                  name="description"
                  rows={5}
                  autoFocus
                  autoComplete="description"
                  {...formik.getFieldProps("description")}
                  className={classNames("w-full", {
                    "p-invalid":
                      formik.errors.description && formik.touched.description,
                  })}
                />
                <label
                  htmlFor="description"
                  className={
                    formik.errors.description && formik.touched.description
                      ? "text-red-300"
                      : "text-black"
                  }
                >
                  {labels.description}
                </label>
              </span>

              <span className="p-float-label p-input-icon-left w-full mb-6">
                <i className="pi pi-search" />
                <InputText
                  type="text"
                  id="inputSearch"
                  name="inputSearch"
                  autoComplete="inputSearch"
                  {...formik.getFieldProps("inputSearch")}
                  className={classNames("w-full", {
                    "p-invalid":
                      formik.errors.inputSearch && formik.touched.inputSearch,
                  })}
                />
                <label
                  htmlFor="inputSearch"
                  className={
                    formik.errors.inputSearch && formik.touched.inputSearch
                      ? "text-red-300"
                      : "text-black"
                  }
                >
                  {labels.inputSearch}
                </label>
              </span>

              <span className="p-float-label p-input-icon-left w-full mb-6">
                <i className="pi pi-dollar" />
                <InputText
                  type="number"
                  id="price"
                  name="price"
                  autoComplete="price"
                  {...formik.getFieldProps("price")}
                  className={classNames("w-full", {
                    "p-invalid": formik.errors.price && formik.touched.price,
                  })}
                />
                <label
                  htmlFor="price"
                  className={
                    formik.errors.price && formik.touched.price
                      ? "text-red-300"
                      : "text-black"
                  }
                >
                  {labels.price}
                </label>
              </span>

              <span className="p-float-label p-input-icon-left w-full mb-6">
                <i className="pi pi-link" />
                <InputText
                  type="text"
                  id="url"
                  name="url"
                  autoComplete="url"
                  {...formik.getFieldProps("url")}
                  className={classNames("w-full", {
                    "p-invalid": formik.errors.url && formik.touched.url,
                  })}
                />
                <label
                  htmlFor="url"
                  className={
                    formik.errors.url && formik.touched.url
                      ? "text-red-300"
                      : "text-black"
                  }
                >
                  {labels.url}
                </label>
              </span>

              <div className="p-float-label w-full mb-6">
                <Dropdown
                  id="typeSourceId"
                  name="typeSourceId"
                  value={formik.values.typeSourceId}
                  onChange={formik.handleChange}
                  options={catalogTypeOpenSource}
                  optionLabel="name"
                  className="w-full"
                />
                <label
                  htmlFor="typeSourceId"
                  className={
                    formik.errors.typeSourceId && formik.touched.typeSourceId
                      ? "text-red-300"
                      : "text-black"
                  }
                >
                  {labels.typeSourceId}
                </label>
              </div>

              <span className="p-float-label w-full">
                <Checkbox
                  inputId="isSuscribed"
                  name="isSuscribed"
                  checked={formik.values.isSuscribed}
                  onChange={formik.handleChange}
                />
                <label htmlFor="isSuscribed"> {labels.isSuscribed}</label>
              </span>

              <Button
                type="submit"
                label={labels.submit}
                icon="pi pi-globe"
                className="w-full mt-6 mb-4"
              />
              {isLoading ? (
                <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
              ) : null}
              {errorMessage !== "" ? (
                <p className="text-sm text-red-300">{errorMessage}</p>
              ) : null}
              {successMessage !== "" ? (
                <p className="text-sm text-green-500 font-bold">
                  {successMessage}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
