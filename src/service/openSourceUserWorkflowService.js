import axios from "axios";
import { getHeaders } from "./authenticateService";
import { API_ENDPOINTS } from "../config/apiConfig";

class openSourceUserWorkflowService {
  constructor() {
    this.getHeaders = getHeaders();
  }

  async findAll(nroPage = 1, pageSize = 50) {
    const response = await axios.get(
      API_ENDPOINTS.opensources_user_workflow_page,
      {
        headers: this.getHeaders,
        params: {
          page: nroPage,
          size: pageSize,
        },
      }
    );
    return response.data;
  }

  async create(payload) {
    const response = await axios.post(
      API_ENDPOINTS.opensources_user_workflow,
      payload,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }

  async update({ id, payload }) {
    console.log("payload", payload);
    console.log("id", id);
    const response = await axios.put(
      `${API_ENDPOINTS.opensources_user_workflow}/${id}`,
      payload,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }

  async findById(id) {
    const response = await axios.get(
      `${API_ENDPOINTS.opensources_user_workflow}/${id}`,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }

  async updateStatus(id, status) {
    const response = await axios.patch(
      `${API_ENDPOINTS.opensources_user_workflow_update_status}/${id}?status=${status}`,
      {},
      { headers: this.getHeaders }
    );
    return response.data;
  }

  async findAllByStatus(status) {
    const response = await axios.get(
      `${API_ENDPOINTS.opensources_user_workflow_find_all_by_status}/${status}`,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }

  //pageByStatus
  async pageByStatus(status, nroPage = 1, pageSize = 50) {
    console.log(
      "LUCO-API",
      API_ENDPOINTS.opensources_user_workflow_page_by_status
    );
    const response = await axios.get(
      API_ENDPOINTS.opensources_user_workflow_page_by_status,
      {
        headers: this.getHeaders,
        params: {
          status: status,
          page: nroPage,
          size: pageSize,
        },
      }
    );
    return response.data;
  }
}

export default new openSourceUserWorkflowService();
