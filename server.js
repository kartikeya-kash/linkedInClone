import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect("mongodb://127.0.0.1:27017/lnclonedb")
    .then(() => console.log("Connected to MongoDB: lnclonedb"))
    .catch((err) => console.error("MongoDB connection error:", err));


const PORT = 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));