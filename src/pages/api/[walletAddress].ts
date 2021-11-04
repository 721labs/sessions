import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@libs/db";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ nonce: string | null }>
) {
  const address = req.query.walletAddress as string;

  if (req.method === "GET") {
    let wallet = await prisma.wallet.findUnique({ where: { address } });

    if (!wallet) {
      wallet = await prisma.wallet.create({ data: { address } });
    }

    res.status(200).send({ nonce: wallet.nonce });
  } else {
    res.status(405).send({ nonce: null });
  }
}

export default handler;
