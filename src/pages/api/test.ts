// Types
import type { NextApiRequest, NextApiResponse } from "next";

// Middleware
import isAuthenticated from "@libs/auth/api-middleware";

// Require the requestor to have an active session
export default isAuthenticated(
  (req: NextApiRequest, res: NextApiResponse<null>) =>
    res.status(200).send(null)
);
