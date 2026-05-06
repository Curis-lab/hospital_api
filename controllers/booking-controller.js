import Stripe from "stripe";
import Doctor from "../models/doctor-schema.js";
import User from "../models/user-schema.js";

export const getCheckoutSession = async (req, res) => {
  try {
    const { appointmentDate } = req.body;
    if (!appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide appointment date and time",
      });
    }
    const doctorServices = new doctorServices();
    const patientServices = new patientServices();

    res
      .status(200)
      .json({ success: true, message: "Successfully paid.", booking });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session." });
  }
};
