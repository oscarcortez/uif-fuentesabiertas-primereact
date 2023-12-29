import { useState, useRef } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import classNames from "classnames";
import { Toast } from "primereact/toast";

import { useNavigate } from "react-router-dom";
import {
  initialValues,
  validationSchema,
  labels,
  errorCodes,
  submitDelay,
} from "../../config/loginConfig";

import { authenticateService } from "../../service/authenticateService";

export const Login = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const payload = {
        username: values.email.split("@")[0],
        password: values.password,
      };
      try {
        const authService = new authenticateService();
        await authService.login(payload);

        showSuccess(labels.success + payload.username);
        setTimeout(() => {
          navigate("/dashboard");
        }, submitDelay);
      } catch (error) {
        const errorMessage = errorCodes[error.code];
        if (errorMessage) {
          showError(errorMessage);
        } else {
          showError(error.code);
        }
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <div className="flex align-items-center justify-content-center h-screen">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-4">
          <form
            onSubmit={formik.handleSubmit}
            className="pages-panel card flex flex-column"
          >
            <div className="text-center">
              <img src="/uif-logo.png" alt="hyper" height={250} />
              <div className="text-900 text-3xl font-medium mb-3">
                {labels.title}
              </div>
              <span className="text-600 font-medium line-height-3">
                {labels.subtitle}
              </span>
              <span className="p-float-label p-input-icon-left mt-6 w-full">
                <i className="pi pi-envelope" />
                <InputText
                  type="text"
                  id="email"
                  name="email"
                  autoFocus
                  autoComplete="email"
                  {...formik.getFieldProps("email")}
                  className={classNames("w-full", {
                    "p-invalid": formik.errors.email && formik.touched.email,
                  })}
                />
                <label htmlFor="email">{labels.email}</label>
              </span>
              {formik.errors.email && formik.touched.email ? (
                <p className="text-sm text-right text-red-300 m-0 p-0">
                  {formik.errors.email}
                </p>
              ) : null}
              <span className="p-float-label p-input-icon-left mt-5 w-full">
                <i className="pi pi-lock" />
                <InputText
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...formik.getFieldProps("password")}
                  className={classNames("w-full", {
                    "p-invalid":
                      formik.errors.password && formik.touched.password,
                  })}
                />
                <label htmlFor="password">{labels.password}</label>
              </span>
              {formik.errors.password && formik.touched.password ? (
                <p className="text-sm text-right text-red-300 m-0 p-0">
                  {formik.errors.password}
                </p>
              ) : null}
              <Button
                type="submit"
                label={labels.submit}
                loading={isLoading}
                icon="pi pi-user"
                className="w-full mt-6 mb-4"
              />
            </div>
          </form>
        </div>
        <Toast ref={toast} position="center" />
      </div>
    </>
  );
};
