import axios from "axios";
import { getHeaders } from "./authenticateService";
import { API_ENDPOINTS } from "../config/apiConfig";

class experienceExchangeService {
  constructor() {
    this.getHeaders = getHeaders();
  }

  async create(payload) {
    const response = await axios.post(
      API_ENDPOINTS.experience_exchange,
      payload,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }

  async findAll() {
    const response = await axios.get(API_ENDPOINTS.experience_exchange, {
      headers: this.getHeaders,
    });
    return response.data;
  }

  async updateStatus(id, status) {
    const response = await axios.patch(
      `${API_ENDPOINTS.experience_exchange_update_status}/${id}?status=${status}`,
      {},
      { headers: this.getHeaders }
    );
    return response.data;
  }

  async findById(id) {
    const response = await axios.get(
      `${API_ENDPOINTS.experience_exchange}/${id}`,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }

  async update(id, payload) {
    const response = await axios.put(
      `${API_ENDPOINTS.experience_exchange}/${id}`,
      payload,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }
}

export default new experienceExchangeService();
