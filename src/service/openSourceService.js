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

  async update({ id, payload }) {
    const response = await axios.put(
      `${API_ENDPOINTS.opensources}/${id}`,
      payload,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }

  async findById(id) {
    const response = await axios.get(`${API_ENDPOINTS.opensources}/${id}`, {
      headers: this.getHeaders,
    });
    return response.data;
  }

  async updateStatus(id, status) {
    const response = await axios.patch(
      `${API_ENDPOINTS.opensources_update_status}/${id}?status=${status}`,
      {},
      { headers: this.getHeaders }
    );
    return response.data;
  }

  async findAllByStatus(status) {
    const response = await axios.get(
      `${API_ENDPOINTS.opensources_find_all_by_status}/${status}`,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }
}

export default new openSourceService();
