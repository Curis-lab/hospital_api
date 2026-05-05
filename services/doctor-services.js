import DoctorSchema from "../models/doctor-schema.js";
import DoctorRepository from "../repositories/doctor-repository.js";
import { isEmail, isString } from "../utils/validators.js";


export default class DoctorServices {
	constructor(){
		this.repository = new DoctorRepository();
	}
	
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

	async create(data) {
		const { isValid, errors } = this.validate(data);

		const doctor = new DoctorSchema(data);
		await doctor.save();
	}
	async listOfDoctor(){
		await this.repository.all()
	}
}
