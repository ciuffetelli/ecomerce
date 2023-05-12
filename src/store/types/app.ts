import { Menu } from '@/Components/Menu/@types'
import { AppCategory, BasketItem } from "@types";

export type App = {
    menu: Menu,
    categories: AppCategory[],
    basket: {
        items: BasketItem[],
        total: number,
    }
    favorites: BasketItem[],
    status?: 'initial' | 'idle' | 'loading' | 'failed',
}