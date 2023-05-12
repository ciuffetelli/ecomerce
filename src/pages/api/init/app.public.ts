import type { NextApiRequest, NextApiResponse } from 'next'
import { slugify } from '@/helpers/slugify'
import { api } from '@/services/api';

import { App } from '@/store/types/app'
import { AppCategory } from "@types";
import { MenuItem } from '@/Components/Menu/@types'

export type BestBuyApiCategory = {
  categories: {
    id: string, 
    name: string
    subCategories: {
      id: string,
      name: string
    }[]  
  }[]
}

export default async function handler(request: NextApiRequest, response: NextApiResponse<App>) {

  const bestbuyApiResponse = await api<BestBuyApiCategory>({
    api: 'bestbuy',
    path: 'categories',
    params: {
      pagination: 20
    }
  })

  if(bestbuyApiResponse.error) return response.status(200).json({
    menu: [],
    categories: [],
    basket: {
      items: [],
      total: 0,
    },
    favorites: [],
    status: 'failed',
  })

  const appCategory = bestbuyApiResponse.data?.categories?.map<AppCategory>((category) => ({
    id: category.id,
    name: category.name,
    url: slugify(category.name),
    subCategories: category.subCategories?.map<AppCategory>((subCategory) => ({
      id: subCategory.id,
      name: subCategory.name,
      url: slugify(subCategory.name),
    }))
  }))  

  const categoriesToMenu = appCategory?.map<MenuItem>((category) => ({
      title: category.name,
      type: 'category',
      url: category.url
  }))  

  const menu = categoriesToMenu?.slice(0, 4)
  menu?.push({
      title: 'More',
      type: 'dropdown',
      children: categoriesToMenu?.slice(4)
  })

  return response.status(200).json({
    categories: appCategory ?? [],
    menu: menu ?? [],
    basket: {
      items: [],
      total: 0,
    },    
    favorites: [],
  })
}