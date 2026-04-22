import { Router } from "express";
import { authenticate, restrict } from "../middlewares/verify-token.js";
import {
	deleteDoctor,
	getAllDoctors,
	getDoctorAppointments,
	getDoctorProfile,
	getSingleDoctor,
	updateDoctor,
} from "../controllers/doctorController.js";
import reviewRouter from "./review.js";

const router = Router();

router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctors);
router.put("/", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);
router.get(
	"/appointments-list/me",
	authenticate,
	restrict(["doctor"]),
	getDoctorAppointments,
);

export default router;
