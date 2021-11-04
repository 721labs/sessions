interface SigningError {
  code: number;
  message: string;
  stack: string;
}

interface SigningResponse {
  id: string | undefined;
  jsonrpc: string;
  result: string | undefined;
  error?: SigningError;
}

export type { SigningError, SigningResponse };
