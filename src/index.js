import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

import conn from "./db/connection.js";
import express from "express";
import {app} from "./app.js";



// Load environment variables
console.log("Loaded ENV PORT:", process.env.PORT);  // Debugging log


// Establish Database Connection
conn()
.then(() => {
    app.listen(process.env.PORT, ()=>{
        console.log(`Server running on port ${process.env.PORT}`);  // Log the server's port number
    } );
})
.catch((error) => {
    console.error(" Error connecting to MongoDB:", error);
    process.exit(1); // Exit on failure
})