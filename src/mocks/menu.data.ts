import { MenuType } from '@/Components/Menu/@types'

export const menu: MenuType = {
    Home: {
        href: "/"
    },
    Categories: {
        type: 'category',
        children: {
        }
    },
    Most_Loved: {
        type: 'images',
        children: {}
    },
    Pages: {
        type: 'dropdown',
        children: {
            About: {
                href: "/about"
            },
            Contact: {
                href: "/contact"
            },
            Pages: {
                type: 'dropdown',
                children: {
                    About: {
                        href: "/about"
                    },
                    Contact: {
                        href: "/contact"
                    }
                }
            },
        }
    },
    Blog: {
        href: "/blog"
    },
    "Get in touch": {
        href: "/contact"
    }
}