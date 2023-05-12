import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from '@/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}