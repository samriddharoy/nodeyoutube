import dotenv from "dotenv";
import conn from "./db/connection.js";

// Load environment variables
dotenv.config();

// Establish Database Connection
conn()
  