import {
	createReview,
	getAllReviews,
} from "../controllers/review-controller.js";
import { authenticate, restrict } from "../middlewares/verify-token.js";
import Controller from "./controller.js";

export default class ReviewRoute extends Controller {
	constructor() {
		super();
		// this.get("/", getAllReviews);
		// this.post("/", authenticate, restrict(["patient"]), createReview);
	}
}
