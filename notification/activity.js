function remainAppointment() {
  return {
    type: "remainder",
    message: "You have appointment within 24 hours.",
    timestamp: new Date().now,
  };
}
function printLabResult() {
    this.name = 'tuntun'
}

printLabResult.__proto__ = 'name';
function remainMedication() {
    
}

function assignNewAppointment() {}
function emergencyAlert() {}
function scheduleChanges() {}

function paymentStatus() {}
function adminAlert() {}
function systemWarnings() {}

export {
    remainAppointment,
    printLabResult,
    remainMedication,
    assignNewAppointment,
    emergencyAlert,
    scheduleChanges,
    paymentStatus,
    adminAlert,
    systemWarnings
}