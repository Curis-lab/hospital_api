import Stripe from "stripe";
import Doctor from "../models/doctor-schema.js";
import User from "../models/user-schema.js";
import { MixBookingRepository } from "../src/adapters/common/repositories/book.rep.js";
import { MixDoctorRepository } from "../src/adapters/common/repositories/doctor.rep.js";
import { MixPatientRepository } from "../src/adapters/common/repositories/patient.rep.js";
import MixUnitOfWorkService from "../src/adapters/common/services/MixUnitOfWorkServices.js";

const generateBookingGateways = MixUnitOfWorkService(
	MixDoctorRepository(MixPatientRepository(MixBookingRepository(class {}))),
);

const BookingGateway = new generateBookingGateways();

export const getCheckoutSession = async (req, res) => {
	try {
		const { appointmentDate } = req.body;
		if (!appointmentDate) {
			return res.status(400).json({
				success: false,
				message: "Please provide appointment date and time",
			});
		}
		const doctor = await BookingGateway.getDoctorById(req.params.doctorId);
		const user = await BookingGateway.findPatientById(req.userId);

		//I need to know what time is patient select and send
		if (!doctor) {
			return res
				.status(404)
				.json({ success: false, message: "Doctor not found" });
		}
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

		const doctorName = doctor.name || "Doctor Consultation";
		const doctorBio = doctor.bio || "Medical consultation service";
		const doctorPhoto = doctor.photo || "";


		const booking = await BookingGateway.createBooking({
			doctorId: doctor._id, // Changed from doctorId to doctor to match schema
			patientId: user._id, // Changed from userId to user to match schema
			doctorTicketPrice: doctor.ticketPrice, // Changed from doctorTicketPrice to ticketPrice
			sessionId: "123",
			appointmentDate,
		});

		await booking.save();

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
