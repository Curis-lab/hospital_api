import {
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
  getSingleDoctor,
  getDoctorProfile,
  getDoctorAppointments
} from "../controllers/doctorController.js";
import { Router } from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from './review.js';

const router = Router();
//nested router
router.use('/:doctorId/reviews', reviewRouter);

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctors);
router.put("/", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);
router.get('/appointments-list/me', authenticate, restrict(['doctor']), getDoctorAppointments);

export default router;
