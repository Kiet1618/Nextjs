export type GetAddressRequest = {
  email: string;
  verifier: 'google';
};

export type GetAddressResponse = {
  owner: string;
  publicKey: string;
  address: string;
};

export type ErrorApi = {
  statusCode: string;
  errorMessage?: string;
}