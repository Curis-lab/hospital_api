import { response } from "express";
import DoctorSchema from "../models/doctor-schema.js";
import DoctorRepository from "../repositories/doctor-repository.js";
import { isEmail, isString } from "../utils/validators.js";

export default class DoctorServices {
  constructor() {
    this.repository = new DoctorRepository();
  }

  async listOfDoctors() {
    const result = await this.repository.all();

    const formatDoctor = (data) => {
      return {
        id: data.id,
        name: data.name,
        photo: data.photo,
        specialization: data.specialization,
        reviews: data.reviews,
        rating: data.totalRating,
        isApproved: data.isApproved,
      };
    };

    return result.map((res) => formatDoctor(res));
  }

  async getDoctor(id) {
    if (!id) {
      throw new Error("there is no id varaible");
    }

    let result;

    result = await this.repository.findById(id);

    const formatProfileInfo = (data) => {
      return {
        name: data.name,
        photo: data.photo,
        rating: data.averageRating,
        isApproved: data.isApproved,
        bio: data.bio,
        about: data.about,
        qualifications: data.qualifications,
        experiences: data.experiences,
        reviews: data.reviews,
        specialization: data.specialization,
      };
    };
    return formatProfileInfo(result);
  }

  async bluck(data) {
    await this.repository.insertMany(data);
  }
}
