// 3rd-Party Modules
import * as sigUtil from "@metamask/eth-sig-util";

// Libs
import api from "@libs/api";

// Types
import type { SigningError, SigningResponse } from "./types";

// Constants
import { EIP721_SIGNATURE_TYPE_DEFINITIONS, APP_NAME } from "./constants";

/**
 * Given a public key, fetches a session nonce from the API
 * @param publicKey Wallet Address
 * @returns {string} nonce
 */
async function fetchNonce(publicKey: string): Promise<string> {
  const { data } = await api.get(publicKey);
  return data.nonce;
}

/**
 *
 */
async function signNonce(
  provider: any,
  publicKey: string,
  chainId: number,
  nonce: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    return provider.send(
      {
        method: "eth_signTypedData_v4",
        params: [
          publicKey,
          JSON.stringify({
            domain: {
              chainId: chainId,
              name: APP_NAME,
            },
            message: { nonce },
            ...EIP721_SIGNATURE_TYPE_DEFINITIONS,
          }),
        ],
        from: publicKey,
      },
      (err: SigningError, result: SigningResponse) => {
        if (err || result.error) {
          throw new Error(err?.message || result.error?.message);
        }
        resolve(result.result as string);
      }
    );
  });
}

/**
 *
 * @param address
 * @param chainId
 * @param nonce
 * @param signedChallenge
 * @returns boolean indicating whether the given
 */
function verifySignedNonce(
  address: string,
  chainId: number,
  nonce: string,
  signedChallenge: string
): boolean {
  const recovered = sigUtil.recoverTypedSignature({
    //@ts-expect-error
    data: {
      domain: { chainId, name: APP_NAME },
      message: { address, nonce },
      ...EIP721_SIGNATURE_TYPE_DEFINITIONS,
    },
    signature: signedChallenge,
    version: sigUtil.SignTypedDataVersion.V4,
  });
  return address.toLowerCase() === recovered.toLowerCase();
}

export { fetchNonce, signNonce, verifySignedNonce };
