export type BasketItem = {
    id: number
    title: string
    price: number
    quantity: number
    image?: string
}
export type Basket = {
    items: BasketItem[]
}