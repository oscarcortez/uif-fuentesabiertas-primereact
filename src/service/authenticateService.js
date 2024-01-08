import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

const login = async (payload) => {
  const res = await axios.post(API_ENDPOINTS.authenticate, payload);
  localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const currentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};

const getToken = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("user")).token;
  }
  return null;
};

const getUsername = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("user")).username;
  }
  return null;
};

const getHeaders = () => {
  if (!isLoggedIn()) return {};

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
};

export {
  login,
  logout,
  currentUser,
  isLoggedIn,
  getToken,
  getHeaders,
  getUsername,
};
