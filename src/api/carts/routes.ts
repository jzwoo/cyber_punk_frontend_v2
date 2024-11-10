const API_VERSION = "/api/v1"

export const CART_API_ROUTES = {
  GET_CART: (user_id: string) => `${API_VERSION}/users/${user_id}/cart`,
  UPDATE_CART: (user_id: string) => `${API_VERSION}/users/${user_id}/cart`,
}
