import type { AppProps } from "next/app"

import "Styles/reset.css"
import "Styles/utils.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
