import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({ quiet: true });

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "PrepMate AI Backend Running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
