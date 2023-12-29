import axios from "axios";
import { authenticateService } from "./authenticateService";
import { API_ENDPOINTS } from "../config/apiConfig";

class catalogService {
  constructor() {
    const authService = new authenticateService();
    this.getHeaders = authService.getHeaders();
  }

  async findAllTipoFuentesAbiertas() {
    const response = await axios.get(
      API_ENDPOINTS.catalogs_list_tipo_fuentes_abiertas,
      {
        headers: this.getHeaders,
      }
    );
    return response.data;
  }

  async findAllTipoFuentesAbiertasForDdl() {
    const response = await axios.get(
      API_ENDPOINTS.catalogs_list_tipo_fuentes_abiertas,
      {
        headers: this.getHeaders,
      }
    );

    const result = await response.data.data.map((item) => {
      return {
        code: item.id,
        name: item.descripcion,
      };
    });

    return result;
  }
}

export default new catalogService();
