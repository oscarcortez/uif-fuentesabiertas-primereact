import PropTypes from "prop-types";
import classNames from "classnames";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export const LoginForm = ({ paths, labels, formik, loginMutation, toast }) => {
  return (
    <>
      <div className="flex align-items-center justify-content-center h-screen">
        <div className="surface-card p-4 shadow-2 border-round w-full lg:w-4">
          <form
            onSubmit={formik.handleSubmit}
            className="pages-panel card flex flex-column"
          >
            <div className="text-center">
              <img src={paths.headerImage} alt="hyper" height={250} />
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
                loading={loginMutation.isPending}
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

LoginForm.propTypes = {
  labels: PropTypes.object,
  formik: PropTypes.object,
  loginMutation: PropTypes.object,
  toast: PropTypes.object,
  headerImage: PropTypes.string,
  paths: PropTypes.object,
};
