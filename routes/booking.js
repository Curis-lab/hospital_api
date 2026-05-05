import { getCheckoutSession } from "../controllers/booking-controller.js";
import { authenticate } from "../middlewares/verify-token.js";
import Controller from "./controller.js";


export default class BookingRoute extends Controller{
    constructor(){super();
        this.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);
    
    }
}