import * as dotenv from "dotenv";

dotenv.config();

export default {
  baseUrl: process.env.API_BASE_URL ?? "",
  apiKey: process.env.API_KEY ?? "",
};
