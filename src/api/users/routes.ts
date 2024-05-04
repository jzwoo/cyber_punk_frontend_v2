const API_VERSION = "/api/v1"

export const USER_API_ROUTES = {
  GET_USER: (username: string) => `${API_VERSION}/users/${username}`,
}
