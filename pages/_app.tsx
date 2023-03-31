import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'

import Layout, { getLayout } from '../components/Layout'

import '@vercel/examples-ui/globals.css'

function App({ Component, pageProps }: AppProps) {

  return (
    <Layout
      title="Navi"
      path="Navi Sales"
      description="Navi AI tu asistente Financiero y Contable"
      
    >
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  )
}

export default App
