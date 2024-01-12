import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

import { useFormik } from "formik";
import { LoginForm } from "../../components/LoginForm";

import { showSuccess, showError } from "../../components/CustomToast";

import {
  initialValues,
  validationSchema,
  labels,
  errorCodes,
  submitDelay,
  paths,
} from "../../config/loginConfig";

import { login as loginService } from "../../service/authenticateService";

export const Login = () => {
  const loginMutation = useMutation({
    mutationFn: (payload) => {
      return loginService(payload);
    },
  });

  const navigate = useNavigate();
  const toast = useRef(null);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        username: values.email.split("@")[0],
        password: values.password,
      };

      loginMutation.mutate(payload, {
        onSuccess: () => {
          // (data) => {
          showSuccess(toast, labels.success, payload.username);
          setTimeout(() => {
            navigate("/dashboard");
          }, submitDelay);
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
      <LoginForm
        paths={paths}
        labels={labels}
        formik={formik}
        loginMutation={loginMutation}
        toast={toast}
      />
    </>
  );
};
