import MixUnitOfWorkService from "../../adapters/common/services/MixUnitOfWorkServices.js";
import { MixDoctorRepository } from "../../adapters/common/repositories/doctor.rep.js";
import { MixBookingRepository } from "../../adapters/common/repositories/book.rep.js";
import { MixPatientRepository } from "../../adapters/common/repositories/patient.rep.js";

const generateDoctorGateway = MixUnitOfWorkService(
  MixBookingRepository(MixDoctorRepository(MixPatientRepository(class {})))
);

export default generateDoctorGateway;
