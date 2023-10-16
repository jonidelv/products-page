export type Category = {
  name: string
  order: number
}

export type Sorting = {
  name: string
  key: string
  slug: string | null
}

export type Product = {
  id: number
  name: string
  description: string
  image: string
  price: number
  category: Category
}

export type CartItemType = {
  quantity: number
  product: Product
}

export type CartStateType = {
  [id: string]: CartItemType
}

export type ProductPostItem = {
  id: number
  quantity: number
}
