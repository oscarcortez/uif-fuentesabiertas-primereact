const showSuccess = (toast, summary, message) => {
  toast.current.show({
    severity: "success",
    summary: summary,
    detail: message,
  });
};

const showError = (toast, summary, message) => {
  toast.current.show({
    severity: "error",
    summary: summary,
    detail: message,
  });
};

export { showSuccess, showError };
