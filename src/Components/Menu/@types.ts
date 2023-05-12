export type MenuType = 'images' | 'category' | 'dropdown' | 'loading'

export type MenuItem = {
    title: string
    type?: MenuType
    url?: string
    image?: string
    children?: MenuItem[]
}

export type Menu = MenuItem[]