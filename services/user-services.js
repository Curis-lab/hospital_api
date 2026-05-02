import UserSchema from "../models/UserSchema.js";
import generateAuthGateway from "../src/use-cases/generate-auth/generate-auth.gateway.js";
import ROLE from "../utils/constant.js";

const authGateway = new generateAuthGateway();

export default class UserServices {
	constructor(role = ROLE.PATIENT) {
		this.role = role;
	}
	async findUserByMail(email) {
		let user;
		user = await authGateway.getDoctorByEmail(email);
		if (!user) {
			user = await authGateway.findPatientByEmail(email);
		}
		return user;
	}
	async createUser(data) {
		const user = new UserSchema(data);
		await user.save();
	}

	async isMailExist(email) {
		try {
			const user = await UserSchema.find({ email, role: this.role });
			return user.length > 0;
		} catch (err) {
			throw new Error(`Error : ${err.message}`);
		}
	}
	async getUserById(id) {
		const user = await UserSchema.findById(id);
		return user;
	}
}
