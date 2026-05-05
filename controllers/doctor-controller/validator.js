export default function validateDoctor(data) {
	const errors = {};

	if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
		errors.name = "Name is required";
	}

	if (data.email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(data.email)) {
			errors.email = "Invalid email format";
		}
	}

	if (data.phone) {
		if (typeof data.phone !== "string" || data.phone.length < 6) {
			errors.phone = "Phone must be at least 6 characters";
		}
	}

	if (!data.specialization || data.specialization.trim() === "") {
		errors.specialization = "Specialization is required";
	}

	if (Object.keys(errors).length > 0) {
		return {
			success: false,

			errors,
		};
	}

	return {
		success: true,
		data: {
			name: data.name.trim(),
			email: data.email,
			password: data.password,
			photo: data.photo,
			specialization: data.specialization,
			role: "doctor",
			experiences: data.experiences,
		},
	};
}
