import { config } from "dotenv";
import process from "process";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});
export const { PORT, NODE_ENV, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN, JWT_REFRESH_SECRET } = process.env;
