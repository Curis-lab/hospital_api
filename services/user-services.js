import UserSchema from "../models/user-schema.js";
import DoctorRepository from "../repositories/doctor-repository.js";
import PatientRepository from "../repositories/patient-repository.js";
import generateAuthGateway from "../src/use-cases/generate-auth/generate-auth.gateway.js";
import ROLE from "../utils/constant.js";

export default class UserServices {
	constructor(role = ROLE.PATIENT) {
		this.role = role;
		this.model = new generateAuthGateway();
		this.doctorRepo = new DoctorRepository();
		this.patientRepos = new PatientRepository();
	}

	async createUser(data) {
		let result = null;
		if (this.role === "doctor") {
			result = await this.doctorRepo.create(data);
		} else {
			result = await this.patientRepos.create(data);
		}
		return result;
	}

	async extractUserByMail(email) {
		let result = null;
		if (this.role === "doctor") {
			result = await this.doctorRepo.findByMail(email);
		} else {
			result = await this.patientRepos.findByMail(email);
		}
		return result;
	}
	async getUserById(id) {
		const user = await UserSchema.findById(id);
		return user;
	}
}
