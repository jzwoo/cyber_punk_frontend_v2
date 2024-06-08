const API_VERSION = "/api/v1"

export const CART_API_ROUTES = {
  GET_CART: (id: string) => `${API_VERSION}/carts/${id}`,
  UPDATE_CART: (id: string) => `${API_VERSION}/carts/${id}`,
}
