import type { AppProps } from "next/app"
import React from "react"

import "Styles/reset.css"
import "Styles/utils.css"

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
