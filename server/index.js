import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import notesRouter from "./routes/generateRoute.js";
import pdfRouter from "./routes/pdfRoute.js";
import creditsRouter from "./routes/creditsRoute.js";
dotenv.config({ quiet: true });

const PORT = process.env.PORT || 5000;

const app = express();

await connectDB();

// stripe webhook route and sending raw data not json because stripe webhook dont accept json formate
// app.post(
//   "/api/credits/webhook",
//   express.raw({ type: "application/json" }),
//   stripeWebhook,
// );

// Middleware for parsing JSON bodies
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "PrepMate AI Backend Running" });
});

// API endpoints
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/credit", creditsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
