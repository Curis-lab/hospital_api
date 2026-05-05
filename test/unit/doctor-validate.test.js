import assert from "node:assert/strict";
import test from "node:test";
import validateDoctor from "../../controllers/doctor-controller/validator.js";

// -------------------- SUCCESS CASE --------------------
test("should validate a correct doctor object", () => {
	const input = {
		name: "John Doe",
		email: "john@example.com",
		phone: "123456789",
		specialization: "Cardiology",
		password: "secret123",
		photo: "photo.jpg",
		experiences: 5,
	};

	const result = validateDoctor(input);

	assert.equal(result.success, true);
	assert.equal(result.data.name, "John Doe");
	assert.equal(result.data.role, "doctor");
});

// -------------------- NAME VALIDATION --------------------
test("should fail when name is empty", () => {
	const result = validateDoctor({
		name: "",
		specialization: "Cardiology",
	});

	assert.equal(result.success, false);
	assert.ok(result.errors.name);
});

// -------------------- EMAIL VALIDATION --------------------
test("should fail when email is invalid", () => {
	const result = validateDoctor({
		name: "John",
		email: "invalid-email",
		specialization: "Cardiology",
	});

	assert.equal(result.success, false);
	assert.ok(result.errors.email);
});

// -------------------- PHONE VALIDATION --------------------
test("should fail when phone is too short", () => {
	const result = validateDoctor({
		name: "John",
		phone: "123",
		specialization: "Cardiology",
	});

	assert.equal(result.success, false);
	assert.ok(result.errors.phone);
});

// -------------------- SPECIALIZATION VALIDATION --------------------
test("should fail when specialization is missing", () => {
	const result = validateDoctor({
		name: "John",
	});

	assert.equal(result.success, false);
	assert.ok(result.errors.specialization);
});
