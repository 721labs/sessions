// Types
import type { NextPage } from "next";

// Hooks
import useWallet from "../libs/wallet/useWallet";
import { useState } from "react";

// Libs
import api from "@libs/api";
import { fetchNonce, signNonce } from "@libs/auth";

const Home: NextPage<{}> = ({}) => {
  const [authenticated, set] = useState<boolean>(false);

  const wallet = useWallet();
  const publicKey = wallet.address as string;
  const chainId = wallet.chainId as number;

  async function login() {
    try {
      const nonce = await fetchNonce(publicKey);

      const signedNonce = await signNonce(
        wallet.provider,
        publicKey,
        chainId,
        nonce
      );

      // Persist the session verification headers for all subsequent api requests
      api.defaults.headers.common["x-address"] = publicKey;
      api.defaults.headers.common["x-chain-id"] = chainId.toString();
      api.defaults.headers.common["x-signed-nonce"] = signedNonce;

      const { status } = await api.get("test");
      set(status === 200);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>721 Session Demo</h1>
      <p>
        Your wallet address is <code>{wallet.address}</code>.
      </p>
      <br />
      <div>
        {authenticated ? (
          <strong>Session Initialized</strong>
        ) : (
          <button disabled={!wallet.address || !wallet.chainId} onClick={login}>
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
