import assert from "node:assert";
import test from "node:test";
import { login } from "../controllers/authController.js";
import UserServices from "../services/user-services.js";

test("login returns 404 when user is not found", async () => {
	const originalFindUserByMail = UserServices.prototype.findUserByMail;
	UserServices.prototype.findUserByMail = async () => null;

	const req = {
		body: {
			email: "missing@example.com",
			password: "secret",
		},
	};

	const response = {
		statusCode: null,
		payload: null,
		status(code) {
			this.statusCode = code;
			return this;
		},
		json(data) {
			this.payload = data;
			return this;
		},
	};

	try {
		await login(req, response);

		assert.strictEqual(response.statusCode, 404);
		assert.deepStrictEqual(response.payload, {
			message: "User not found.",
			body: null,
		});
	} finally {
		UserServices.prototype.findUserByMail = originalFindUserByMail;
	}
});
