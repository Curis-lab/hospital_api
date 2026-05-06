export default class BookServices {
  validateAppointmentRequest() {}
  createAppointment(appointmentId) {
    isVerifiedPayment();
    isAuthenticatedPatient();
    isDoctorAvailable(doctorId);
  }
}
