import type { AppProps } from "next/app";

import "../styles/main.scss";
import "../styles/filter.scss";
import "../styles/table.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
