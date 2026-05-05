import express from "express";
import { getCheckoutSession } from "../controllers/booking-controller.js";
import { authenticate } from "../middlewares/verify-token.js";

const router = express.Router();
router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);
export default router;
