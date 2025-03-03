const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./User');  // FIX: Corrected Import

const app = express();
const PORT = 3000;

// MongoDB Connection
mongoose.connect("mongodb://admin:secret@mongo:27017/userdata?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use(cors());  // Fix CORS issues
app.use(express.json());

// Simple Homepage
app.get("/", (req, res) => {
    res.send("👋 Welcome to Node.js Backend API!");
});

// Create User API (POST /user)
app.post('/user', async (req, res) => {
    try {
        const { name, birthdate, birthplace, birthtime } = req.body;
        const newUser = new User({ name, birthdate, birthplace, birthtime });
        await newUser.save();
        res.status(201).json({ message: "✅ User saved", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "❌ Error saving user", error });
    }
});

// Fetch Users API (GET /users)
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "❌ Error fetching users", error });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
