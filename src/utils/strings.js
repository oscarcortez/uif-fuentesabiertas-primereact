export const usernameFormated = (username) => {
  return (
    username
      .split(".")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ") || ""
  );
};

export const usernameAvatar = (username) => {
  return (
    username
      .split(".")
      .map((name) => name.charAt(0).toUpperCase())
      .join("") || ""
  );
};
