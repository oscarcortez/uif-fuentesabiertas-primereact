import axios from "axios";
import { getHeaders } from "./authenticateService";
import { API_ENDPOINTS } from "../config/apiConfig";

class experienceExchangeService {
  constructor() {
    this.getHeaders = getHeaders();
  }

  async create(payload) {
    const response = await axios.post(
      API_ENDPOINTS.experienceexchange,
      payload,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }
}

export default new experienceExchangeService();
