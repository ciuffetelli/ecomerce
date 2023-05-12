import { createAsyncThunk } from '@reduxjs/toolkit'

import { App } from '@/store/types/app'
import { initialState } from '@/store/reducers/app'

import { api } from '@/services/api'

export type BestBuyApiCategory = {
    id: string, 
    name: string
    subCategories: {
      id: string,
      name: string
    }[]  
  }

export const initialFetch = createAsyncThunk<App>('app/initialFetch', async () => {

  const result = await api<App>({
    api: 'local',
    path: 'init/app',
  })

  return result.data ?? {
    ...initialState,
    status: 'failed',
  }
})

export default Object.freeze({
    initialFetch,
})