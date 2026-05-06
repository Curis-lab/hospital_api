import AuthRoute from "./auth.js";
import BookingRoute from "./booking.js";
import bookingRouter from "./booking.js";
import Controller from "./controller.js";
import DoctorRoute from "./doctor.js";
import ReviewRoute from "./review.js";
import reviewRouter from "./review.js";
import ToolsRoute from "./tools.js";
import PatientRoute from "./user.js";
import userRouter from "./user.js";

export default class IndexRoute extends Controller {
  constructor() {
    super();
    this.use("/auth", new AuthRoute().routes);
    this.use("/patient", new PatientRoute().routes);
    this.use("/doctors", new DoctorRoute().routes);
    this.use("/reviews", new ReviewRoute().routes);
    this.use("/bookings", new BookingRoute().routes);
    this.use("/tools", new ToolsRoute().routes);
  }
}
