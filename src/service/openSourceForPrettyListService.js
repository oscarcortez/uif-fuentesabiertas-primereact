import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";
import { getHeaders } from "./authenticateService";

class openSourceForPrettyListService {
  constructor() {
    this.getHeaders = getHeaders();
  }
  async findAll() {
    const response = await axios.get(
      API_ENDPOINTS.opensources_for_pretty_list,
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

  async findAllByStatus(status) {
    const response = await axios.get(
      `${API_ENDPOINTS.opensources_find_all_by_status}/${status}`,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }

  async findAllBySessionAndFree() {
    const response = await axios.get(
      API_ENDPOINTS.opensources_for_pretty_list_session_and_free,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }
}

export default new openSourceForPrettyListService();
