
import {
  bluckDoctorsInfomation,
  deleteDoctor,
  getAllDoctors,
  getDoctorAppointments,
  getDoctorProfile,
  getSingleDoctor,
  updateDoctor,
} from "../controllers/doctorController.js";
import { authenticate, restrict } from "../middlewares/verify-token.js";
import reviewRouter from "./review.js";
import multerMiddleware from "../middlewares/multer-upload.js";
import Controller from "./controller.js";



export default class DoctorRoute extends Controller {
  constructor() {
    super();
    this.use("/:doctorId/reviews", reviewRouter);

    this.get("/:id", getSingleDoctor);
    this.get("/", getAllDoctors);
    this.put("/", authenticate, restrict(["doctor"]), updateDoctor);
    this.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
    this.get(
      "/profile/me",
      authenticate,
      restrict(["doctor"]),
      getDoctorProfile,
    );
    this.get(
      "/appointments-list/me",
      authenticate,
      restrict(["doctor"]),
      getDoctorAppointments,
    );

    this.post("/bluck", multerMiddleware.fileUpload(), bluckDoctorsInfomation);
  }
}

