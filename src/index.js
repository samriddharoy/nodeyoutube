const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8080;

// Middleware to parse JSON requests
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
    res.send("Hello, World! 🚀");
});

// FIXED: Corrected req and res order
app.get("/api/users",(req, res) => {
    return res.json(users);
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
