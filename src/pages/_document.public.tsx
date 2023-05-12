import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-neutral-200 text-slate-900 dark:bg-slate-800 dark:text-white ease-in-out duration-300'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
