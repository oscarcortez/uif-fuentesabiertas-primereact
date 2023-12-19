import { useState } from "react";
import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import classNames from "classnames";

import { useNavigate } from "react-router-dom";
import {
  initialValues,
  validationSchema,
  labels,
  errorCodes,
  submitDelay,
} from "../../config/configLogin";

import { authenticateService } from "../../service/authenticateService";

export const Login = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
        setErrorMessage("");
        const authService = new authenticateService();
        await authService.login(payload);

        setSuccessMessage(labels.success + payload.username);

        setTimeout(() => {
          navigate("/dashboard");
        }, submitDelay);
      } catch (error) {
        // console.log(error);
        const errorMessage = errorCodes[error.code];
        if (errorMessage) {
          setErrorMessage(errorMessage);
        } else {
          setErrorMessage(error.code);
        }
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <div className="flex align-items-center justify-content-center h-screen">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
          <form
            onSubmit={formik.handleSubmit}
            className="pages-panel card flex flex-column"
          >
            <div className="text-center">
              <img src="/public/uif-logo.png" alt="hyper" height={250} />
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
                icon="pi pi-user"
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
