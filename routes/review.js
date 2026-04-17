import {
  getAllReviews,
  createReview,
} from "../controllers/reviewController.js";
import { Router } from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = Router({mergeParams: true});

router.get("/", getAllReviews);
router.post("/",authenticate, restrict(["patient"]), createReview);

export default router;
