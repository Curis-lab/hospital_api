import express from "express";
import { getCheckoutSession } from "../controllers/bookingController.js";
import { authenticate } from "../middlewares/verify-token.js";

const router = express.Router();
router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);
export default router;
