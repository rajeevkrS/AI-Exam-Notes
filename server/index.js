import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
dotenv.config({ quiet: true });

const PORT = process.env.PORT || 5000;

const app = express();

await connectDB();

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.json({ message: "PrepMate AI Backend Running" });
});

// API endpoints
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
