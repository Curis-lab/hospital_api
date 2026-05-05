import {
  deleteUser,
  getAllUser,
  getMyAppointments,
  getSingleUser,
  getUserProfile,
  updateUser,
} from "../controllers/user-controller.js";
import { authenticate, restrict } from "../middlewares/verify-token.js";
import Controller from "./controller.js";

export default class PatientRoute extends Controller {
  constructor() {
    super();
    // this.get("/:id", authenticate, restrict(["patient"]), getSingleUser);
    // this.get("/", authenticate, restrict(["admin"]), getAllUser);
    // this.put("/:id", authenticate, restrict(["patient"]), updateUser);
    // this.delete("/:id", authenticate, restrict(["patient"]), deleteUser);
    // this.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);
    // this.get(
    // 	"/appointments/my-appointment",
    // 	authenticate,
    // 	restrict(["patient"]),
    // 	getMyAppointments,
    // );
  }
}
