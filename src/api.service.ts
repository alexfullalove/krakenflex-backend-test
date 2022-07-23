import axios from "axios";
import apiConfig from "./api.config";
import { Outages, SiteInfo } from "./types";

export const getOutages = async (): Promise<Outages[]> => {
  const response = await axios.get(`${apiConfig.baseUrl}/outages`, {
    headers: {
      "x-api-key": apiConfig.apiKey,
    },
  });
  return response.data;
};

export const getSiteInfo = async (siteId: string): Promise<SiteInfo> => {
  const response = await axios.get(`${apiConfig.baseUrl}/site-info/${siteId}`, {
    headers: {
      "x-api-key": apiConfig.apiKey,
    },
  });
  return response.data;
};
// get site info

// post site outages
