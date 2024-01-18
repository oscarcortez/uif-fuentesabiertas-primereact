const BASE_URL = `${import.meta.env.VITE_APP_BACKEND_URL}:${
  import.meta.env.VITE_APP_BACKEND_PORT
}`;
const API_VERSION = "/api/v1";
export const API_ENDPOINTS = {
  authenticate: `${BASE_URL}/authenticate`,
  opensources_page: `${BASE_URL}${API_VERSION}/opensources/page`,
  opensources: `${BASE_URL}${API_VERSION}/opensources`,
  opensources_update_status: `${BASE_URL}${API_VERSION}/opensources/update-status`,
  opensources_find_all_by_status: `${BASE_URL}${API_VERSION}/opensources/findAllByStatus`,
  catalogs_list_tipo_fuentes_abiertas: `${BASE_URL}${API_VERSION}/catalogs/list-tipo-fuentes-abiertas`,
  catalogs_list_workflow: `${BASE_URL}${API_VERSION}/catalogs/list-workflow`,
};
