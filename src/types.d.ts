namespace APIv1 {
  type Response<T> = {
    status: number
    statusText: string
    data: T
  }

  type User = {
    id: string
    name: string
    email: string
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

  type Cart = {
    id: string
    user_id: string
    likes: string[]
    items: string[]
  }
}
