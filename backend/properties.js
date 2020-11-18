import dotenv from "dotenv";
dotenv.config();
const properties = {
  dbUrl: process.env.DB_URL || "mongodb://localhost/oneshot",
  port: process.env.PORT || 8080,
  api: "/api",
};

export default properties;
