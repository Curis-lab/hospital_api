import { MixDoctorRepository } from "../../adapters/common/repositories/doctor.rep.js";
import { MixPatientRepository } from "../../adapters/common/repositories/patient.rep.js";
import MixUnitOfWorkService from "../../adapters/common/services/MixUnitOfWorkServices.js";

const generateAuthGateway = MixUnitOfWorkService(
  MixDoctorRepository(MixPatientRepository(class {}))
);

export default generateAuthGateway;
