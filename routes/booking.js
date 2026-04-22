import express from "express";
import { authenticate } from "../middlewares/verify-token.js";
import { getCheckoutSession } from "../controllers/bookingController.js";

const router = express.Router();
router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);
export default router;
