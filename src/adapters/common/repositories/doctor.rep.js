import Doctor from "../../../../models/DoctorSchema.js";

export function MixDoctorRepository(Gateway) {
  return class DoctorRepository extends Gateway {
    constructor(...args) {
      super(...args);
    }
    async registerDoctor(doctorInfo) {
      return await Doctor.create({ ...doctorInfo });
    }
    async getAllDoctors() {
      return await Doctor.find({
        isApproved: "approved",
      }).select("-password");
    }
    async getAllDoctorsByQuery(query) {
      return await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    }
    async getDoctorById(id) {
      return await Doctor.findById(id).populate("reviews").select("-password");
    }
    async getDoctorByEmail(email) {
      return await Doctor.findOne({ email });
    }
    async updateDoctorById(id, updateData) {
      return await Doctor.findByIdAndUpdate(
        id,
        { $set: { ...updateData, isApproved: "approved" } },
        { new: true }
      ).select("-password");
    }
    async deleteDoctorById(id) {
      return await Doctor.findByIdAndDelete(id);
    }
    async getDoctorsByIds(doctorIds) {
      return Doctor.find({ _id: { $in: doctorIds } }).select("-password");
    }
    async giveDoctorApproval(id) {
      //check if already approve and make it file
      return await Doctor.findByIdAndUpdate(id, { $set: {isApproved: "approved"} });
    }
  };
}
