import PatientRepository from "../repositories/patient-repository.js";
import { decrpytPwd } from "./auth-services.js";

export default class PatientServices {
  constructor() {
    this.repository = new PatientRepository();
  }

  async register(patientData) {
    let result;

    const hashPwd = await decrpytPwd(patientData.password);
    const formattedData = {
      ...patientData,
      password: hashPwd,
      role: "patient",
    };

    result = await this.repository.create(formattedData);

    return result;
  }

  async hasPatientByMail(patientMail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(patientMail)) {
      throw new Error("Invalid email format");
    }

    return await this.repository.findByMail(patientMail);
  }

  async getPatientById(id) {
    let patient;
    patient = await this.repository.findById(id);
    return patient;
  }
}
