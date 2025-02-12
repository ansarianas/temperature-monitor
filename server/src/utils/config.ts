import dotenv from "dotenv";

dotenv.config();

const { env } = process;

const config = {
  DB_URI: env.DB_URI || "",
  WS_PORT: env.WS_PORT || 4000,
  WS_BASE_URI: env.WS_BASE_URI || "http://localhost:4000",
  WS_URI: env.WS_URI || "ws://localhost:4000",
  N8N_BASE_URI: env.N8N_BASE_URI || "http://localhost:5678",
  REST_PORT: env.REST_PORT || 9000,
  REST_HOST: env.REST_HOST || "0.0.0.0",
};

export default config;
