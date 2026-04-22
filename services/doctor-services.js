import DoctorSchema from "../models/DoctorSchema.js";
import { isEmail, isString } from "../utils/validators.js";



export default class DoctorServices {
  validate(data) {
    const errors = [];
    if (!isEmail(data.email)) {
      errors.push("Invalid email");
    }
    if (!isString(data.password, 6)) {
      errors.push("Password must be at least 6 characters.");
    }
    if (!isString(data.name, 3)) {
      errors.push("Name must be at least 3 characters");
    }

    if (!isString(data.phone, 7)) {
      errors.push("Phone must be string with min 7 chars");
    }

    if (!isNumber(data.ticketPrice)) {
      errors.push("Ticket price must be a number");
    }

    if (!isEnum(data.role, ["doctor", "admin"])) {
      errors.push("Invalid role");
    }

    if (!isArray(data.qualifications)) {
      errors.push("Qualifications must be array");
    }

    if (!isArray(data.experiences)) {
      errors.push("Experiences must be array");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
  
  async create() {
    //acceptent
    const data = {
      email: "doctor@example.com",
      password: "hashed_password", // You should hash the password before storing it
      name: "John Doe",
      phone: 1234567890,
      photo: "http://example.com/doctor-photo.jpg",
      ticketPrice: 100,
      role: "admin",
      specialization: "Cardiology",
      qualifications: ["MBBS", "MCNP"],
      experiences: [{ institution: "XYZ Hospital", year: 2015 }],
      bio: "Professional cardiologi",
      about:
        "Specializes in treating heart diseases and stroke. Expert inleading clinical teams.",
      timeSlots: ["09:00", "10:00", "11:00"],
      reviews: [], // If you don't have any reviews yet, leave it empty
      averageRating: 0,
      totalRating: 0,
      isApproved: "approved",
    };


    const { isValid, errors } = this.validate(data);

    //example we can use it, when we need to change some datatype
    // data.ticketPrice = Number(data.ticketPrice);

    const doctor = new DoctorSchema(data);
    await doctor.save();
  }
}
