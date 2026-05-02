import { redisClient } from "../http-server.js";
import Booking from "../models/booking-schema.js";
import { deleteImageKitImage } from "../src/infrastructure/plugins/imagekit/delete-file-imagekit.js";
import generateDoctorGateway from "../src/use-cases/generate-doctor/generate-doctor.gateway.js";
import missingField from "../utils/check-field.js";

const doctorGateway = new generateDoctorGateway();

async function doctorInteractor(search) {
	try {
		let doctorsFromSearch;
		if (search) {
			doctorsFromSearch = await doctorGateway.getAllDoctorsByQuery(search);
		}
		doctorsFromSearch = await doctorGateway.getAllDoctors();

		if (doctorsFromSearch.length <= 0) {
			return httpResponseFormat(404, "Doctors have not yet.");
		}
		return httpResponseFormat(200, "Doctors found.", doctorsInfo);
	} catch (err) {
		return httpResponseFormat(500, "Internal server error on doctors.");
	}
}
export const updateDoctor = async (req, res) => {
	try {
		const { email, ...updateData } = req.body;

		async function giveApprovalToDoctor(doctorId) {
			await doctorGateway.giveDoctorApproval(doctorId);
		}

		const updatedUser = await doctorGateway.updateDoctorById(
			req.userId,
			updateData,
		);

		if (updatedUser.specialization && updatedUser.qualifications) {
			await giveApprovalToDoctor(req.userId);
		}

		if (updatedUser == null) {
			res.status(500).json({ success: false, message: "Failed to update" });
			return;
		}

		res.status(200).json({
			success: true,
			message: "Successfully updated.",
			data: updatedUser,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, message: "Failed to update" });
	}
};

export const deleteDoctor = async (req, res) => {
	const id = req.params.id;
	try {
		const doctor = await doctorGateway.getDoctorById(id);
		if (doctor.photo) {
			await deleteImageKitImage(doctor.photo);
		}

		await doctorGateway.deleteDoctorById(id);
		res.status(200).json({
			success: true,
			message: "Successfully deleted.",
		});
	} catch (err) {
		res.status(500).json({ success: false, message: "Failed to delete." });
	}
};

export const getSingleDoctor = async (req, res) => {
	const id = req.params.id;
	try {
		const doctor = await doctorGateway.getDoctorById(id);
		if (doctor === null) {
			res
				.status(500)
				.json({ success: false, message: "Doctor did not exist." });
			return;
		}
		res.status(200).json({
			success: true,
			message: "Doctor found.",
			data: doctor,
		});
	} catch (err) {
		res.status(500).json({ success: false, message: "Doctor did not exist." });
	}
};

async function doctors(search) {
	return search
		? await doctorGateway.getAllDoctorsByQuery(search)
		: await doctorGateway.getAllDoctors();
}

//iteracte
//select
//sequential

export const getAllDoctors = async (req, res) => {
	const { search } = req.query;

	const { code, message, body } = await doctorInteractor(search);
	res.status(code).json({ message, body });
};

export const getDoctorProfile = async (req, res) => {
	const doctorId = req.userId;
	try {
		const doctor = await doctorGateway.getDoctorById(doctorId);
		if (!doctor) {
			res.status(404).json({ success: false, message: "User not found." });
			return;
		}
		const { password, ...rest } = doctor._doc;
		// const appointments = await Booking.find({ doctor: doctorId });
		const appointments = await doctorGateway.getBookingById({ id: doctorId });
		//I should know it exectly
		res.status(200).json({
			success: true,
			message: "Profile Info is getting.",
			data: { ...rest, appointments },
		});
	} catch (err) {
		console.log(err);
		res
			.status(500)
			.json({ success: false, message: "Something went wrong, cannot get" });
	}
};

export const getDoctorAppointments = async (req, res) => {
	const doctorId = req.userId;
	try {
		const doctor = await doctorGateway.getDoctorById(doctorId);
		if (!doctor) {
			res.status(404).json({ success: false, message: "User not found." });
			return;
		}
		const { password, ...rest } = doctor._doc;
		const appointments = await Booking.find({ doctor: doctorId });
		const patientIds = appointments.map((appointment) => appointment.user);
		const patients = await doctorGateway.findPatientsByIds(patientIds);

		// console.log(patients);
		const result = appointments.map((appointment) => {
			const patient = patients.find(
				(p) => p._id.toString() === appointment.user.toString(),
			);
			return {
				id: appointment._id,
				name: patient?.name,
				gender: patient?.gender,
				time: appointment.appointmentDate,
				patientPhoto: patient?.photo,
				patientBloodType: patient?.bloodType,
				paidStatus: appointment.isPaid,
				patientPhone: patient?.phone,
			};
		});
		res.status(200).json({
			success: true,
			message: "Appointments found successfully",
			data: result,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: "Failed to get appointments",
		});
	}
};
