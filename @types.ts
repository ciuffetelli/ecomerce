import { MenuType } from '@/Components/Menu/@types'
import { Basket } from '@/Components/Basket/@types'

export type AppData = {
    menu: MenuType,
    basket: Basket,
    categories: string[],
    products: FakeStoreApiProductType[]
}

export type FakeStoreApiProductType = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
      rate: number
      count: number
    }
  }