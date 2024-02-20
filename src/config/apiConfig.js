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

  opensources_user_workflow_page: `${BASE_URL}${API_VERSION}/opensources-user-workflow/page`,
  opensources_user_workflow: `${BASE_URL}${API_VERSION}/opensources-user-workflow`,
  opensources_user_workflow_update_status: `${BASE_URL}${API_VERSION}/opensources-user-workflow/update-status`,
  opensources_user_workflow_find_all_by_status: `${BASE_URL}${API_VERSION}/opensources-user-workflow/findAllByStatus`,
  opensources_user_workflow_page_by_status: `${BASE_URL}${API_VERSION}/opensources-user-workflow/pageByStatus`,
  opensources_user_workflow_by_session: `${BASE_URL}${API_VERSION}/opensources-user-workflow/bySession`,
  opensources_user_workflow_page_by_userid: `${BASE_URL}${API_VERSION}/opensources-user-workflow/bySession`,
  opensources_user_workflow_page_by_session: `${BASE_URL}${API_VERSION}/opensources-user-workflow/page-by-session`,

  opensources_for_pretty_list: `${BASE_URL}${API_VERSION}/opensources-for-pretty-list`,
  opensources_for_pretty_list_typelist: `${BASE_URL}${API_VERSION}/opensources-for-pretty-list/typeList`,
  opensources_for_pretty_list_session_and_free: `${BASE_URL}${API_VERSION}/opensources-for-pretty-list/session-and-free`,
  opensources_for_pretty_list_for_item_view: `${BASE_URL}${API_VERSION}/opensources-for-pretty-list/for-item-view`,

  opensources_user_external_link: `${BASE_URL}${API_VERSION}/opensources-user-external-link`,

  users_find_by_session: `${BASE_URL}${API_VERSION}/users/find-by-session`,
};
