import axios from "axios";
import apiConfig from "./api.config";
import { Outages } from "./types";

export const getOutages = async (): Promise<Outages[]> => {
  const response = await axios.get(`${apiConfig.baseUrl}/outages`, {
    headers: {
      "x-api-key": apiConfig.apiKey,
    },
  });
  return response.data;
};
// get site info

// post site outages
