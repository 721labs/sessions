// Wallet Lib
import WalletContext from "./context";
import type { State } from "./types";

// Hooks
import { useEffect, useState } from "react";

// 3rd Party Modules
import Web3 from "web3";
import { provider as TProvider } from "web3-core";
import detectEthereumProvider from "@metamask/detect-provider";

const WalletProvider: React.FC<{ children: React.ReactChild }> = ({
  children,
}) => {
  const [chainId, setChainId] = useState<number | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [web3, set] = useState<Web3 | null>(null);

  useEffect(() => {
    async function setup() {
      const provider = await detectEthereumProvider();

      // Check if MetaMask is installed
      if (!provider) return;

      // If `provider` is not the same as `window.ethereum`, something is overwriting it;
      // perhaps another wallet?
      if (provider !== window.ethereum) {
        console.error("Do you have multiple wallets installed?");
      }

      const _web3 = new Web3(provider as TProvider);
      set(_web3);

      const [account] = await _web3.eth.getAccounts();
      setAddress(account);

      const id = await _web3?.eth.getChainId();
      setChainId(id as number);
    }
    setup();
  }, []);

  /**
   * Handle chain change.
   */
  useEffect(() => {
    return web3
      ? //@ts-expect-error
        window.ethereum?.on("chainChanged", (_chainId: number) => {
          if (_chainId !== chainId) window.location.reload();
        })
      : null;
  }, [web3]);

  /**
   * Handle account change.
   */
  useEffect(() => {
    return web3
      ? //@ts-expect-error
        window.ethereum?.on("accountsChanged", (accounts: Array<string>) => {
          if (accounts[0] !== address) window.location.reload();
        })
      : null;
  }, [web3]);

  return (
    <WalletContext.Provider
      value={{ provider: web3?.eth.currentProvider, address, chainId } as State}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
