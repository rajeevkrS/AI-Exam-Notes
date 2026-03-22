import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  createCreditsOrder,
  verifyPayment,
} from "../controllers/creditsController.js";

const creditsRouter = express.Router();

creditsRouter.post("/order", isAuth, createCreditsOrder);
creditsRouter.post("/verify-payment", verifyPayment);

export default creditsRouter;
