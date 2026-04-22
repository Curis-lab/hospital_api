'use strict';

import jwt from "jsonwebtoken";
import UserServices from "../services/user-services.js";

export const authenticate = async (req, res, next) => {
	const authToken = req.headers.authentication;

	if (!authToken || !authToken.startsWith("Bearer ")) {
		res
			.status(401)
			.json({ success: false, message: "No token, authentication denied." });
		return;
	}
	try {
		const token = authToken.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.id;
		req.role = decoded.role;

		next();
	} catch (err) {
		if (err.name === "TokenExpiredError") {
			res.status(401).json({ message: "Token is expired." });
			return;
		}
		res.status(401).json({ success: false, message: "Invalid token." });
	}
};

export const restrict = (roles) => async (req, res, next) => {
	const userId = req.userId;

	const user = await new UserServices().getUserById(userId);

	if (!roles.includes(user.role)) {
		res.status(401).json({
			success: false,
			message: "You are not authorized to access this resource.",
		});
		return;
	}
	next();
};
