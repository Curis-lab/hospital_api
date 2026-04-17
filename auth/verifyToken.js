import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

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
  let user;

  const patient = await User.findById(userId);
  const doctor = await Doctor.findById(userId);

  if (patient) {
    user = patient;
  } else if (doctor) {
    user = doctor;
  }

  if (!roles.includes(user.role)) {
    res
      .status(401)
      .json({
        success: false,
        message: "You are not authorized to access this resource.",
      });
    return;
  }
  next();
};
