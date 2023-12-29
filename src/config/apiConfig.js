const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL}:${
  import.meta.env.VITE_APP_BACKEND_PORT
}`;
const API_VERSION = "/api/v1";
export const API_ENDPOINTS = {
  authenticate: `${BASE_URL}/authenticate`,
  opensources_page: `${BASE_URL}${API_VERSION}/opensources/page`,
  opensources: `${BASE_URL}${API_VERSION}/opensources`,
  catalogs_list_tipo_fuentes_abiertas: `${BASE_URL}${API_VERSION}/catalogs/list-tipo-fuentes-abiertas`,
};