// Types
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@libs/db";

import { verifySignedNonce } from "./index";

/**
 * Next API Route Middleware that verifies that a given request contains a
 * properly signed nonce indicating an active, authentic session.
 */
const isAuthenticated =
  (handler: (req: NextApiRequest, res: NextApiResponse<any>) => void) =>
  async (req: NextApiRequest, res: NextApiResponse<any>) => {
    // Parse request headers
    const address = req.headers["x-address"] as string;
    const chainId = parseInt(req.headers["x-chain-id"] as string);
    const signedNonce = req.headers["x-signed-nonce"] as string;

    // Look up the nonce associated with this wallet address
    const { nonce } = await prisma.wallet.findUnique({
      where: { address },
      select: { nonce: true },
      rejectOnNotFound: true,
    });

    const verified = verifySignedNonce(address, chainId, nonce, signedNonce);

    return verified
      ? handler(req, res)
      : res.status(401).json({ error: "Bad verification" });
  };

export default isAuthenticated;
