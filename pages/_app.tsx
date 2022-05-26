import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <Layout pageTitle={'SSSR test'}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp