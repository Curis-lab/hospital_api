"use strict";

import httpResponseFormat from "../utils/http-response-format.js";
import generateDoctorGateway from "../src/use-cases/generate-doctor/generate-doctor.gateway.js";


const doctorGateway = new generateDoctorGateway();

export default async function doctorInteractor(search) {
  try {
    let doctorsInfo;
    if (search) {
      doctorsInfo = await doctorGateway.getAllDoctorsByQuery(search);
    }
    doctorsInfo = await doctorGateway.getAllDoctors();

    if (doctorsInfo.length <= 0) {
      return httpResponseFormat(404, "Doctors have not yet.");
    }
    return httpResponseFormat(200, "Doctors found.", doctorsInfo);
  } catch (err) {
    return httpResponseFormat(500, "Internal server error on doctors.");
  }
}
