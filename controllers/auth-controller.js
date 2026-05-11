import z from "zod";
import dotenv from "dotenv";
import DoctorServices from "../services/doctor-services.js";
import UserServices from "../services/user-services.js";
import httpResponseFormat from "../utils/http-response-format.js";
import ImageKitServices from "../services/imagekit-services.js";
import PatientServices from "../services/patient-services.js";

dotenv.config();

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  gender: z.enum(["male", "female"]),
});

export const registerPatient = async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      const formattedErrors = {};
      for (const [field, messages] of Object.entries(
        result.error.flatten().fieldErrors,
      )) {
        formattedErrors[field] = messages?.[0];
      }

      return res.status(400).json({
        success: result.success,
        message: "Invalid input.",
        errors: formattedErrors,
      });
    }

    const { name, email, password, gender } = (patientInfo = req.body);
    const patientServices = new PatientServices();

    const existedPatient = await patientServices.hasPatientByMail(email);

    if (existedPatient) {
      return res.status(400).json({
        success: false,
        message: "Existing Email. Please change another.",
        errors: "Existing email, please change another.",
      });
    }

    const patient = await patientServices.register(patientInfo);

    res.status(200).json({
      success: true,
      message: "patient registered successfully.",
      body: {
        token: "",
        ...patient,
      },
    });
  } catch (err) {
    res.status(500).json({ message: `errors: ${err.message}` });
  }
};

export async function patientLogin(req, res) {
  try {
    res.status(200).json({
      success: true,
      message: "logged in successfully",
    });
  } catch (err) {
    res.status(200).json({ message: "patientLoginController" });
  }
}

export async function patientLogout(req, res) {
  req.logout(() => {
    res.json({
      success: true,
      message: "logout successfully",
    });
  });
}

export const test = async (req, res) => {
  try {
    const doctor = new DoctorServices();
    await doctor.create();
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "error" });
  }
};
