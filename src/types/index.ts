export type Product = {
  id: string
  name: string
  categoryId: string,
  price: number,
  image: string
}

export type Category = {
  id: string,
  name: string
}

export type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  role: string
}