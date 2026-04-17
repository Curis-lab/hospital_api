import Book from "../../../../models/BookingSchema.js";

export function MixBookingRepository(Gateway) {
	return class PatientRepository extends Gateway {
		constructor(...args) {
			super(...args);
		}
		async createBooking({
			doctorId,
			patientId,
			doctorTicketPrice,
			sessionId,
			appointmentDate,
		}) {
			return await Book.create({
				doctor: doctorId,
				user: patientId,
				ticketPrice: doctorTicketPrice,
				session: sessionId,
				appointmentDate,
			});
		}
		async getBookingById(id) {
			return await Book.find(id);
		}
	};
}
