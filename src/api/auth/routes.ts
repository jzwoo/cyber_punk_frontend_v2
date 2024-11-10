const API_VERSION = "/api/v1"

export const AUTH_API_ROUTES = {
  LOGOUT: () => `${API_VERSION}/auth/logout`,
  REFRESH: () => `${API_VERSION}/auth/refresh`,
}
