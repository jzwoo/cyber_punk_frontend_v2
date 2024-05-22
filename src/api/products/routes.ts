const API_VERSION = "/api/v1"

export const PRODUCT_API_ROUTES = {
  GET_PRODUCTS: () => `${API_VERSION}/products`,
  GET_PRODUCT: (productUuid: string) =>
    `${API_VERSION}/products/${productUuid}`,
}
