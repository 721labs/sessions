import type { AppProps } from "next/app";
import Head from "next/head";
import WalletProvider from "../libs/wallet/provider";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Generator Web</title>
      </Head>
      <WalletProvider>
        <main>
          <Component {...pageProps} />
        </main>
      </WalletProvider>
    </>
  );
}

export default App;
