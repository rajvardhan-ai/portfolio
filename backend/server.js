const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (modern Mongoose, no extra options)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log("MongoDB Connection Error ❌", err));

// Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

// Feedback route
app.post("/submit", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        console.log("DATA RECEIVED:", req.body);
        res.send("Message received ✅");
    } catch(err) {
        console.log("Error saving:", err);
        res.status(500).send("Error saving message ❌");
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} 🚀`);
});