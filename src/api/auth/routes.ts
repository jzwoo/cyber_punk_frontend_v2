const API_VERSION = "/api/v1"

export const AUTH_API_ROUTES = {
  REGISTER: () => `${API_VERSION}/register`,
  LOGIN: () => `${API_VERSION}/login`,
  LOGOUT: () => `${API_VERSION}/logout`,
  REFRESH: () => `${API_VERSION}/refresh`,
}
