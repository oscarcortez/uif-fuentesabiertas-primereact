import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

export class authenticateService {
  async login(payload) {
    const res = await axios.post(API_ENDPOINTS.authenticate, payload);
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  currentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  isLoggedIn() {
    return !!localStorage.getItem("user");
  }

  getToken() {
    return JSON.parse(localStorage.getItem("user")).token;
  }

  getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getToken()}`,
    };
  }
}
