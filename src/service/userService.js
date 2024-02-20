import axios from "axios";
import { getHeaders } from "./authenticateService";
import { API_ENDPOINTS } from "../config/apiConfig";

class userService {
  constructor() {
    this.getHeaders = getHeaders();
  }

  async findBySession() {
    const response = await axios.get(API_ENDPOINTS.users_find_by_session, {
      headers: this.getHeaders,
    });
    return response.data;
  }
}
export default new userService();
