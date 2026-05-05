import DoctorSchema from "../models/doctor-schema.js";

export default class DoctorRepository {
  constructor() {}
  _validate(data) {
    const errors = {};

    if (!data.email || typeof data.email !== "string") {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(data.email)) {
        errors.email = "Invalid email format";
      }
    }

    if (!data.password || typeof data.password !== "string") {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!data.name || typeof data.name !== "string") {
      errors.name = "Name is required";
    }

    if (!data.phone || typeof data.phone !== "number") {
      errors.phone = "Phone must be a number";
    }

    if (data.photo) {
      try {
        new URL(data.photo);
      } catch {
        errors.photo = "Invalid photo URL";
      }
    }

    if (typeof data.ticketPrice !== "number" || data.ticketPrice < 0) {
      errors.ticketPrice = "Ticket price must be a positive number";
    }

    const allowedRoles = ["user", "admin", "doctor"];

    if (!allowedRoles.includes(data.role)) {
      errors.role = "Invalid role";
    }

    if (!data.specialization) {
      errors.specialization = "Specialization is required";
    }

    if (!Array.isArray(data.qualifications)) {
      errors.qualifications = "Qualifications must be an array";
    }

    if (!Array.isArray(data.experiences)) {
      errors.experiences = "Experiences must be an array";
    } else {
      data.experiences.forEach((exp, index) => {
        if (!exp.institution || typeof exp.institution !== "string") {
          errors[`experiences[${index}].institution`] =
            "Institution is required";
        }

        if (!exp.year || typeof exp.year !== "number") {
          errors[`experiences[${index}].year`] = "Year must be a number";
        }
      });
    }

    if (data.bio && typeof data.bio !== "string") {
      errors.bio = "Bio must be a string";
    }

    if (data.about && typeof data.about !== "string") {
      errors.about = "About must be a string";
    }

    if (!Array.isArray(data.timeSlots)) {
      errors.timeSlots = "TimeSlots must be an array";
    } else {
      const timeRegex = /^\d{2}:\d{2}$/;

      data.timeSlots.forEach((time, index) => {
        if (!timeRegex.test(time)) {
          errors[`timeSlots[${index}]`] = "Invalid time format (HH:mm)";
        }
      });
    }

    if (data.averageRating && typeof data.averageRating !== "number") {
      errors.averageRating = "Average rating must be a number";
    }

    if (data.totalRating && typeof data.totalRating !== "number") {
      errors.totalRating = "Total rating must be a number";
    }

    const allowedStatus = ["pending", "approved", "rejected"];

    if (!allowedStatus.includes(data.isApproved)) {
      errors.isApproved = "Invalid approval status";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  async create(data) {
    const { errors } = this._validate(data);

    if (errors) {
      throw new Error("cannot insert to database");
    }

    await DoctorSchema.create(data);
  }
  async delete(id) {
    await DoctorSchema.findByIdAndDelete(id);
  }
  async findByMail(email) {
    await DoctorSchema.findOne({ email });
  }
  async all(){
    return await DoctorSchema.find();
  }
}
