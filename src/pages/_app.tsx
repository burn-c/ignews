import { AppProps } from "next/app";
import { Provider as NextAuthProvider } from 'next-auth/client'

import { Header } from "../components/Header";

import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
      <footer>v0.2.0</footer>
    </NextAuthProvider>
  )
}

export default MyApp;
