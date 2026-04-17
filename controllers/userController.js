import Booking from "../models/BookingSchema.js";
import User from "../models/UserSchema.js";
import MixUnitOfWorkService from "../src/adapters/common/services/MixUnitOfWorkServices.js";
import { MixPatientRepository } from "../src/adapters/common/repositories/patient.rep.js";
import { MixDoctorRepository } from "../src/adapters/common/repositories/doctor.rep.js";
import { deleteImageKitImage } from "../src/infrastructure/plugins/imagekit/delete-file-imagekit.js";

const generatePatientGateway = MixUnitOfWorkService(
  MixPatientRepository(MixDoctorRepository(class {}))
);
const patientGateway = new generatePatientGateway();

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Update data is required",
      });
    }

    const updatedUser = await patientGateway.updatePatientById(id, {
      $set: req.body,
    });

    res.status(200).json({
      success: true,
      message: "Successfully updated.",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: `Failed to update ${err.message}` });
  }
};


export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await patientGateway.findPatientById(id);

    if (user.photo) {
      await deleteImageKitImage(user.photo);
    }

    await patientGateway.deletePatientById(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted.",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete." });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await patientGateway.findPatientById(id);
    res.status(200).json({
      success: true,
      message: "User found.",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "User did not exist." });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await patientGateway.getAllPatients();
    res.status(200).json({
      success: true,
      message: "Users found.",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Users did not exist." });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await patientGateway.findPatientById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }
    const { password, ...rest } = user._doc;
    res.status(200).json({
      success: true,
      message: "Profile Info is getting.",
      data: { ...rest },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId });

    const doctorIds = bookings.map((el) => el.doctor._id);
    const doctors = await patientGateway.getDoctorsByIds(doctorIds);
    res.status(200).json({
      success: true,
      message: "Apppointments are getting",
      data: doctors,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get." });
  }
};
