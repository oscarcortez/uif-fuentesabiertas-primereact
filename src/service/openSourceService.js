import axios from "axios";
import { getHeaders } from "./authenticateService";
import { API_ENDPOINTS } from "../config/apiConfig";

class openSourceService {
  constructor() {
    this.getHeaders = getHeaders();
  }

  async findAll(nroPage = 1, pageSize = 50) {
    const response = await axios.get(API_ENDPOINTS.opensources_page, {
      headers: this.getHeaders,
      params: {
        page: nroPage,
        size: pageSize,
      },
    });
    return response.data;
  }

  async create(payload) {
    const response = await axios.post(API_ENDPOINTS.opensources, payload, {
      headers: this.getHeaders,
    });
    return response.data;
  }

  async findOne(id) {
    const response = await axios.get(`${API_ENDPOINTS.opensources}/${id}`, {
      headers: this.getHeaders,
    });
    return response.data;
  }

  async delete(id) {
    const response = await axios.patch(
      `${API_ENDPOINTS.opensources_update_status}/${id}?status=I`,
      {},
      { headers: this.getHeaders }
    );
    return response.data;
  }
}

export default new openSourceService();
