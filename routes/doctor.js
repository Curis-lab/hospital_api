import {
	bluckDoctorsInfomation,
	deleteDoctor,
	getAllDoctors,
	getDoctorAppointments,
	getDoctorProfile,
	getSingleDoctor,
	updateDoctor,
} from "../controllers/doctor-controller.js";
import multerMiddleware from "../middlewares/multer-upload.js";
import { authenticate, restrict } from "../middlewares/verify-token.js";
import Controller from "./controller.js";
import reviewRouter from "./review.js";

export default class DoctorRoute extends Controller {
	constructor() {
		super();
		this.get("/", getAllDoctors);
		this.use("/:doctorId/reviews", reviewRouter);

		this.get("/:id", getSingleDoctor);
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
