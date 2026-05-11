import { Router } from "express";
import AuthRoute from "./auth.js";
import BookingRoute from "./booking.js";
import bookingRouter from "./booking.js";
import Controller from "./controller.js";
import DoctorRoute from "./doctor.js";
import ReviewRoute from "./review.js";
import reviewRouter from "./review.js";
// import ToolsRoute from "./tools.js";
import PatientRoute from "./user.js";
import userRouter from "./user.js";
import multerMiddleware from "../middlewares/multer-upload.js";
import { uploadCSV } from "../controllers/upload-csv-controller.js";
import {
  fetchAllDoctors,
  getDoctorProfile,
} from "../controllers/doctor-controller.js";
import {
  patientLogin,
  registerPatient,
  patientLogout
} from "../controllers/auth-controller.js";
import passport from "../passport/local-strategy.js";
import { isAuthenticated } from "../middlewares/auth-middleware.js";

const router = Router();
router.post("/csv", multerMiddleware.fileUpload(), uploadCSV);

//doctor
router.get("/doctors", fetchAllDoctors);
router.get("/doctor/:id", getDoctorProfile);


//patient
router.post("/patient/register", registerPatient);
router.post("/patient/login", passport.authenticate("local"), patientLogin);
router.get("/patient/profile", isAuthenticated, (req, res) => {
  res.json(req.user);
});
router.post('/patient/logout',patientLogout);
//router.post('/patient/comment')


export default router;
