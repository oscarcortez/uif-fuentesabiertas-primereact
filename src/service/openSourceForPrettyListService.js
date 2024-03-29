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

  async findByOpenSourceId(openSourceId) {
    const response = await axios.get(
      `${API_ENDPOINTS.opensources_for_pretty_list_for_item_view}/${openSourceId}`,
      {
        headers: this.getHeaders,
      }
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

  async findAllBySessionAndFree(countryCode) {
    const response = await axios.get(
      API_ENDPOINTS.opensources_for_pretty_list_session_and_free,
      {
        headers: this.getHeaders,
      }
    );

    if (countryCode !== "ES") {
      return response.data.data.filter(
        (item) => item.countryCode === countryCode
      );
    }
    return response.data.data;
  }

  async findTypesBySessionAndFree(countryCode) {
    const response = await axios.get(
      API_ENDPOINTS.opensources_for_pretty_list_session_and_free,
      {
        headers: this.getHeaders,
      }
    );

    if (countryCode !== "ES") {
      return [
        ...new Set(
          response.data.data
            .filter((item) => item.countryCode === countryCode)
            .map((item) => item.typeSource)
        ),
      ];
    }
    return [...new Set(response.data.data.map((item) => item.typeSource))];
  }
}

export default new openSourceForPrettyListService();
