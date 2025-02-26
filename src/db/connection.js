import mongoose from "mongoose";

import { db_Name } from "../constants.js"; // Ensure .js extension if using ES module

const conn = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.db_url}/${db_Name}`);

    console.log(`✅ Connected to MongoDB: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // Exit on failure
  }
};

export default conn;
