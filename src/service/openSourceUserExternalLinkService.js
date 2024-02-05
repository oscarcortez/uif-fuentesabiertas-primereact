import axios from "axios";
import { getHeaders } from "./authenticateService";
import { API_ENDPOINTS } from "../config/apiConfig";

class openSourceUserExternalLinkService {
  constructor() {
    this.getHeaders = getHeaders();
  }

  async create(payload) {
    const response = await axios.post(
      API_ENDPOINTS.opensources_user_external_link,
      payload,
      { headers: this.getHeaders }
    );
    return response.data;
  }

  async update({ id, payload }) {
    const response = await axios.put(
      `${API_ENDPOINTS.opensources_user_external_link}/${id}`,
      payload,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }

  async findById(id) {
    const response = await axios.get(
      `${API_ENDPOINTS.opensources_user_external_link}/${id}`,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }

  async updateStatus(id, status) {
    const response = await axios.patch(
      `${API_ENDPOINTS.opensources_user_external_link_update_status}/${id}?status=${status}`,
      {},
      { headers: this.getHeaders }
    );
    return response.data;
  }

  async findAllByStatus(status) {
    const response = await axios.get(
      `${API_ENDPOINTS.opensources_user_external_link_find_all_by_status}/${status}`,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }
}

export default new openSourceUserExternalLinkService();
