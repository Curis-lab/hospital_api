/**
 * purpose: define all business rule
 */


function isDoctorApproved (doctorInfo){
    // Check if all required fields are present and valid
    const requiredFields = [
        'name', 
        'email', 
        'phone',
        'specialization',
        'qualifications',
        'experiences', 
        'bio',
        'timeSlots',
        'ticketPrice'
    ];

    // Verify all required fields exist and are not empty
    for (const field of requiredFields) {
        if (!doctorInfo[field]) {
            return false;
        }
    }

    // Additional validation rules
    if (doctorInfo.qualifications.length === 0 || 
        doctorInfo.experiences.length === 0 ||
        doctorInfo.timeSlots.length === 0 ||
        doctorInfo.ticketPrice <= 0) {
        return false;
    }

    // All checks passed
    return true;
}
