import { createContext } from "react";
import type { State } from "./types";

const defaultState = {};

const WalletContext = createContext(defaultState as State);
WalletContext.displayName = "WalletContext";

export default WalletContext;
