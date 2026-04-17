import generateAuthGateway from "../src/use-cases/generate-auth/generate-auth.gateway.js";

const authGateway = new generateAuthGateway();


export default class UserServices {
  async findUserByMail(email) {
    let user;
    user = await authGateway.getDoctorByEmail(email);
    if (!user) {
      user = await authGateway.findPatientByEmail(email);
    }
    return user;
  }
}
