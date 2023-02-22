import axios, { AxiosError } from "axios";
import { GetAddressRequest, GetAddressResponse, ErrorApi } from "./types";

const config = {
  nodeEndpoints: [
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
  ],
  nodePub: [
    { X: 'bc38813a6873e526087918507c78fc3a61624670ee851ecfb4f3bef55d027b5a', Y: 'ac4b21229f662a0aefdfdac21cf17c3261a392c74a8790db218b34e3e4c1d56a' },
    { X: 'b56541684ea5fa40c8337b7688d502f0e9e092098962ad344c34e94f06d293fb', Y: '759a998cef79d389082f9a75061a29190eec0cac99b8c25ddcf6b58569dad55c' },
    { X: '4b5f33d7dd84ea0b7a1eb9cdefe33dbcc6822933cfa419c0112e9cbe33e84b26', Y: '7a7813bf1cbc2ee2c6fba506fa5de2af1601a093d93716a78ecec0e3e49f3a57' }
  ],
  indexes: [2, 1, 5, 3, 4]
}

export const getAddress = async (input: GetAddressRequest): Promise<{ data?: GetAddressResponse, error?: ErrorApi }> => {
  let errorApi: ErrorApi;
  for (const endpoint of config.nodeEndpoints) {
    try {
      const { email } = input;
      const { data } = await axios.post<GetAddressResponse>(`${endpoint}/wallets`, {
        owner: email
      });
      return { data, error: null };
    } catch (error) {
      const errorMessage = error.response?.data.message;
      const statusCode = error.response?.data.statusCode;
      errorApi = { errorMessage, statusCode };
    }
  }
  if (!errorApi) return { data: null, error: errorApi };
}