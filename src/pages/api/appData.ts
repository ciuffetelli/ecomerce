import type { NextApiRequest, NextApiResponse } from 'next'

import { api } from '@/services/api'
import { slugify } from '@/helpers/slugify'

import { AppData } from '@types'
import { menu } from '@/mocks/menu.data'

import { Basket } from '@/Components/Basket/@types'

type FakeStoreApiProductType = {
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<AppData>) {
  
  const responseProducts = await api.get('https://fakestoreapi.com/products').then(response => response.data)
  const responseCategories = await api.get('https://fakestoreapi.com/products/categories').then(response => response.data)

  menu.Most_Loved.children = responseProducts
                              .sort((a: FakeStoreApiProductType, b: FakeStoreApiProductType) => (a.rating.rate > b.rating.rate ? -1 : 1))
                              .slice(0, 8)
                              .reduce((state: any, product: FakeStoreApiProductType) => {
    state[product.title] = {
      href: `/${product.id}/${slugify(product.title)}`,
      image: product.image
    }
    return state
  }, {})  

  menu.Categories.children = responseCategories.reduce((state: any, category: string) => {

    const productsInCategory = responseProducts
                                .filter((product: FakeStoreApiProductType) => (product.category === category))
                                .sort((a: FakeStoreApiProductType, b: FakeStoreApiProductType) => (a.rating.rate > b.rating.rate ? -1 : 1))
                                .slice(0, 3)

    state[category] = {
      children: {
        ...productsInCategory.reduce((state: any, product: FakeStoreApiProductType) => {
          state[product.title] = {
            href: `/${product.id}/${slugify(product.title)}`,
            image: product.image,
          }
          return state
        }, {}),
        ['see all']: {
          href: `/${slugify(category)}`,
        }
      }
    }
    return state
  }, {})

  const basket = responseProducts.slice(0, 4).reduce((state: Basket, product: FakeStoreApiProductType) => {
    state.items.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
    return state
  }, { items: [] })

  res.status(200).json({
    menu, 
    basket
  })
}