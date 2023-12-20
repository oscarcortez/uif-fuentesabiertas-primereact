import axios from "axios";

export class authenticateService {
  async login(payload) {
    const res = await axios.post("http://localhost:8075/authenticate", payload);
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
}
