import {
	decrpytPwd,
	isCorrectPassword,
	tokenGenerate,
} from "../services/auth-services.js";
import UserServices from "../services/user-services.js";
import uploadImage from "../src/infrastructure/plugins/imagekit/upload-file-imagekit.js";
import httpResponseFormat from "../utils/http-response-format.js";

export const auth = async (req, res) => {
	const { token, expire, signature } = imagekit.getAuthenticationParameters();
	res.send({
		token,
		expire,
		signature,
		publicKey: "public_yRZslw98mgzoetGRkyyG2boI+nA=",
	});
};

export const register = async (req, res) => {
	const { email, password, name, role, gender } = req.body;

	try {
		const existingUser = await new UserServices("patient").isMailExist(email);
		if (existingUser) {
			res
				.status(400)
				.json({ message: "Existing Email. Please change another." });
			return;
		}

		const hashPassword = await decrpytPwd(password);
		let uploadedImage = null;

		if (req.file) {
			uploadedImage = await uploadImage(req.file);
		}

		const userInfo = {
			name,
			email,
			password: hashPassword,
			photo: uploadedImage,
			gender,
			role,
		};

		new UserServices().createUser(userInfo);

		res.status(200).json({
			message: "Image upload successfully",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal server error!" });
	}
};

async function loginController(data) {
	try {
		const { email, password } = data;
		const user = await new UserServices().findUserByMail(email);

		if (!user) {
			return httpResponseFormat(404, "User not found.");
		}

		const hashed = user.password;
		if (!hashed) {
			return httpResponseFormat(400, "Password is not exist");
		}

		if (!isCorrectPassword(password, hashed)) {
			return httpResponseFormat(400, "Password is not correct.");
		}

		//runtime level, but it flexible, high complexity.
		const token = tokenGenerate(user);
		const { role, appointments, _id, __v, ...rest } = user._doc;

		return httpResponseFormat(200, "Successfully logged in.", {
			token,
			...rest,
			role,
		});
	} catch (err) {
		return httpResponseFormat(500, "Failed to login.");
	}
}

export const login = async (req, res) => {
	const { code, message, body } = await loginController(req.body);
	res.status(code).json({ message, body });
};
