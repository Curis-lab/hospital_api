import Patient from "../../../../models/UserSchema.js";

export function MixPatientRepository(Gateway) {
	return class PatientRepository extends Gateway {
		constructor(...args) {
			super(...args);
		}
		async patientRegister(patientInfo) {
			return await Patient.create({ ...patientInfo });
		}
		async findPatientByEmail(email) {
			return await Patient.findOne({ email });
		}
		async findPatientById(id) {
			return await Patient.findById(id).select("-password");
		}
		async updatePatientById(id, updateData) {
			return await Patient.findByIdAndUpdate(id, updateData, {
				new: true,
			}).select("-password");
		}
		async getAllPatients() {
			return await Patient.find().select("-password");
		}
		async deletePatientById(id) {
			return await Patient.findByIdAndDelete(id);
		}
		async findPatientsByIds(patientIds) {
			return await Patient.find({ _id: { $in: patientIds } }).select(
				"-password",
			);
		}
	};
}
