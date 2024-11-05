const API_VERSION = "/api/v1"

export const PRODUCT_API_ROUTES = {
  GET_PRODUCTS: () => `${API_VERSION}/products`,
  GET_PRODUCT: (productId: string) => `${API_VERSION}/products/${productId}`,
}
