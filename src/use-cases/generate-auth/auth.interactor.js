import bcrypt from "bcryptjs";
import generateAuthGateway from "./generate-auth.gateway.js";

const authGateway = new generateAuthGateway();

async function findUserByEmail(email) {
	const doctor = await authGateway.getDoctorByEmail(email);
	if (doctor) return doctor;
	return await authGateway.findPatientByEmail(email);
}
const generateToken = (user) =>
	jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

const createErrorResponse = (success, statusCode, message) => ({
	success,
	statusCode,
	message,
});

const createSuccessResponse = (token, userData) => ({
	success: true,
	statusCode: 200,
	body: {
		status: true,
		message: "Successfully logged in.",
		token,
		data: userData,
		role: userData.role,
	},
});

export const loginInteractor = async ({ email, password }) => {
	const user = await findUserByEmail(email);

	if (!user) {
		return createErrorResponse(false, 404, "User not found.");
	}

	if (!user.password) {
		return createErrorResponse(false, 400, "Password does not exist.");
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		return createErrorResponse(false, 400, "Password is not correct.");
	}

	const token = generateToken(user);
	const { role, appointments, ...userData } = user._doc;

	return createSuccessResponse(token, { ...userData, role });
};
