import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './User.js';

const app = express();
app.use(express.json());
app.use(cors());

    mongoose
    .connect("mongodb://127.0.0.1:27017/lnclonedb")
    .then(() => console.log("Connected to MongoDB: lnclonedb"))
    .catch((err) => console.error("MongoDB connection error:", err));

    app.get('/test', (req, res) => {
        res.send('server is running');
    });


    app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: { fullName: user.fullName, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ fullName, email, password });
    await newUser.save();

    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


const PORT = 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));