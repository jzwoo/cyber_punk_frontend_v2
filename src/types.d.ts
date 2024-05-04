namespace APIv1 {
  type Response<T> = {
    status: number
    statusText: string
    data: T
  }

  type User = {
    uuid: string
    username: string
    name: string
  }

  type Image = {
    aspectRatio: number
    url: string
  }

  type Product = {
    id: string
    name: string
    description: string
    image: Image
    price: number
    quantity: number
    disabled: boolean
  }
}
