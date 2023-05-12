export type AppCategory = {
  id: string
  name: string
  url: string
  subCategories?: {
      id: string
      name: string
      url: string
  }[]
}

export type BasketItem = {
  id: string
  name: string
  url: string
  image: string
  thumbnail: string
  price: number
  savings?: {
      onSale: boolean
      percent: number
  }
  quantity: number
}

// export type AppProduct = {
//   name: string
//   url: string
//   image: string
//   thumbnail: string
//   price: number
//   savings: {
//     onSale: boolean
//     percent: number
//   }
//   mainCategoryId: string
//   category: string[]
//   description: string
//   type: string  
//   customerReviewAverage: number
//   details: {
//       name: string
//       value: string
//   }[]
// }

// /**
//  * API TYPES
//  */

// export type FakeStoreApiResponse = {
//     id: number
//     title: string
//     price: number
//     description: string
//     category: string
//     image: string
//     rating: {
//       rate: number
//       count: number
//     }
// }

// export type BestbuyApiResponse = {
//     name: string
//     customerReviewAverage: number
//     details: {
//         name: string
//         value: string
//     }[]
//     image: string
//     thumbnailImage: string
//     longDescription: string
//     onSale: boolean
//     percentSavings: number
//     regularPrice: number
//     type: string
//     categoryPath: {
//         name: string
//     }[]
// }

// export type BestBuyApiCategory = {
//   id: string 
//   name: string
//   subCategories: {
//     id: string
//     name: string
//   }[]  
// }

// export type BestBuyApiProduct = {
//   name: string
//   customerReviewAverage: number
//   details: {
//       name: string
//       value: string
//   }[]
//   image: string
//   thumbnailImage: string
//   longDescription: string
//   onSale: boolean
//   percentSavings: number
//   regularPrice: number
//   type: string
//   categoryPath: {
//       name: string
//   }[]  
// }

