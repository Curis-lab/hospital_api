import { Router } from "express";
import { authenticate, restrict } from "../middlewares/verify-token.js";
import {
	createReview,
	getAllReviews,
} from "../controllers/reviewController.js";

const router = Router({ mergeParams: true });

router.get("/", getAllReviews);
router.post("/", authenticate, restrict(["patient"]), createReview);

export default router;
