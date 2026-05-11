import UserSchema from "../models/patient-schema.js";

export default class PatientRepository {
  constructor() {}

  _validator(data) {
    const errors = {};

    // EMAIL

    if (!data.email || typeof data.email !== "string") {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(data.email)) {
        errors.email = "Invalid email format";
      }
    }

    // PASSWORD

    if (!data.password || typeof data.password !== "string") {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // NAME

    if (!data.name || typeof data.name !== "string") {
      errors.name = "Name is required";
    } else if (data.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // PHONE (string is better than number)

    if (data.phone !== undefined) {
      const phoneStr = String(data.phone);

      const phoneRegex = /^\+?\d{7,15}$/;

      if (!phoneRegex.test(phoneStr)) {
        errors.phone = "Invalid phone number";
      }
    }

    // PHOTO (URL)

    if (data.photo) {
      try {
        new URL(data.photo);
      } catch {
        errors.photo = "Invalid photo URL";
      }
    }

    // ROLE

    const allowedRoles = ["patient", "admin"];

    if (data.role && !allowedRoles.includes(data.role)) {
      errors.role = "Role must be patient or admin";
    }

    // GENDER

    const allowedGender = ["male", "female", "other"];

    if (data.gender && !allowedGender.includes(data.gender)) {
      errors.gender = "Invalid gender value";
    }

    // BLOOD TYPE

    const allowedBloodTypes = [
      "A+",
      "A-",

      "B+",
      "B-",

      "AB+",
      "AB-",

      "O+",
      "O-",

      "N/A",
    ];

    if (data.bloodType && !allowedBloodTypes.includes(data.bloodType)) {
      errors.bloodType = "Invalid blood type";
    }

    // APPOINTMENTS (ObjectId array check)

    if (data.appointments) {
      if (!Array.isArray(data.appointments)) {
        errors.appointments = "Appointments must be an array";
      } else {
        data.appointments.forEach((id, index) => {
          if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            errors[`appointments[${index}]`] = "Invalid ObjectId";
          }
        });
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,

      errors,
    };
  }
  //proceduer
  async create(data) {
    let result;
    result = await UserSchema.create(data).select('-password');
    return result;
  }
  //proceduer
  async findByMail(email) {
    let result = null;

    result = await UserSchema.findOne({ email });

    return result;
  }
  async findById(id){
    let result = null;
    result = await UserSchema.findById(id).select('-password');
    return result;
  }
}
