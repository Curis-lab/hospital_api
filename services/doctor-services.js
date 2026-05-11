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

  formatTime(date) {
    return date.toTimeString().slice(0, 5);
  }
  generateListOfRandomScheduledDateAndTime(totalSchedules = 10) {
    const schedules = [];

    // doctor working hours
    const START_HOUR = 9;
    const END_HOUR = 17;

    for (let i = 0; i < totalSchedules; i++) {
      // random next 30 days
      const randomDay = Math.floor(Math.random() * 30);

      const date = new Date();
      date.setDate(date.getDate() + randomDay);

      // random hour
      const hour =
        Math.floor(Math.random() * (END_HOUR - START_HOUR)) + START_HOUR;

      // random minute (00 or 30)
      const minute = Math.random() > 0.5 ? 30 : 0;

      const startDate = new Date(date);
      startDate.setHours(hour, minute, 0, 0);

      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + 30);

      schedules.push({
        date: startDate.toISOString().split("T")[0],
        startTime: this.formatTime(startDate),
        endTime: this.formatTime(endDate),
      });
    }

    return schedules;
  }
  async setDoctorAvalibleTimeSlots(doctorId, totalSchedules = 10) {
    if (!doctorId) {
      throw new Error(
        "Did not found doctor id on setDoctorAvalibleTimeSlots func.",
      );
    }
    const scheduledArray =
      this.generateListOfRandomScheduledDateAndTime(totalSchedules);

    if (scheduledArray.length <= totalSchedules) {
      throw new Error("Schedule count is not match with length.");
    }

    const result = await this.repository.update(doctorId, {
      timeSlots: scheduledArray,
    });

    return result;
  }
}
