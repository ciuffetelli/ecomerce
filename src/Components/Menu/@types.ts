export type MenuTypeTypes = 'images' | 'category' | 'dropdown'

export type MenuType = {
    [key: string]: {
        type?: MenuTypeTypes
        href?: string
        image?: string
        children?: MenuType
    }
}