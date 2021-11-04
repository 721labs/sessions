const APP_NAME = "721-test";

const EIP721_SIGNATURE_TYPE_DEFINITIONS = {
  primaryType: "Nonce",
  types: {
    Nonce: [{ name: "nonce", type: "string" }],
  },
};

export { APP_NAME, EIP721_SIGNATURE_TYPE_DEFINITIONS };
