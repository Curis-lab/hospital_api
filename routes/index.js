
import bookingRouter from "./booking.js";
import reviewRouter from "./review.js";
import userRouter from "./user.js";
import AuthRoute from "./auth.js";
import Controller from "./controller.js";
import DoctorRoute from "./doctor.js";

export default class IndexRoute extends Controller {
  constructor() {
    super();
    this.use("/auth", new AuthRoute().routes);
    this.use("/user", userRouter);
    this.use("/doctors", new DoctorRoute().routes);
    this.use("/reviews", reviewRouter);
    this.use("/bookings", bookingRouter);
  }
}
