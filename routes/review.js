import { Router } from "express";
import {
	createReview,
	getAllReviews,
} from "../controllers/review-controller.js";
import { authenticate, restrict } from "../middlewares/verify-token.js";

const router = Router({ mergeParams: true });

router.get("/", getAllReviews);
router.post("/", authenticate, restrict(["patient"]), createReview);

export default router;
