import axios from "axios";
import { getHeaders } from "./authenticateService";
import { API_ENDPOINTS } from "../config/apiConfig";

class catalogService {
  constructor() {
    this.getHeaders = getHeaders();
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

  async findAllWorkflowForDdl() {
    const response = await axios.get(API_ENDPOINTS.catalogs_list_workflow, {
      headers: this.getHeaders,
    });

    const result = await response.data.data.map((item) => {
      return {
        code: item.id,
        name: item.descripcion,
      };
    });

    return result;
  }

  async findAllWorkflowForDdl2() {
    const response = await axios.get(API_ENDPOINTS.catalogs_list_workflow, {
      headers: this.getHeaders,
    });

    const result = await response.data.data.map((item) => {
      return {
        value: item.id,
        label: item.descripcion,
      };
    });

    return result;
  }
}

export default new catalogService();
