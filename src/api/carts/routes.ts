const API_VERSION = "/api/v1"

export const CART_API_ROUTES = {
  GET_CART: (username: string) => `${API_VERSION}/carts/${username}`,
  UPDATE_CART: (username: string) => `${API_VERSION}/carts/${username}`,
}
